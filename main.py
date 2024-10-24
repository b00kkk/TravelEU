from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash
import sqlite3
import pandas as pd
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import SVD
import googlemaps,ast,math
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = '123'
GOOGLE_MAPS_API_KEY = "AIzaSyC26KdaBpD_WPB6-jmXSIjuhcTxemLTlg8"
gmaps = googlemaps.Client(key=GOOGLE_MAPS_API_KEY)
# 사용자 테이블 정보
user_table = 'users'

sqlite_conn = sqlite3.connect('bigdata.db')
sqlite_cursor = sqlite_conn.cursor()

datecount = 1
start_date = '0000-00-00'
end_date = '0000-00-00'
se_date = '0000-00-00'

@app.route('/')
def home():
    return render_template('bplogin.html')

@app.route('/signup_page')
def signup_page():
    return render_template('b.signup.html')

@app.route('/check_duplicate', methods=['POST'])
def check_duplicate():
    try:
        id_to_check = request.form.get('id')
        sqlite_cursor.execute("SELECT COUNT(*) FROM users WHERE id = ?", (id_to_check,))
        result = sqlite_cursor.fetchone()[0]

        if result > 0:
            return jsonify({'status': 'duplicate'})
        else:
            return jsonify({'status': 'available'})

    except sqlite3.Error as e:
        return jsonify({'status': 'error', 'message': f'SQLite error: {str(e)}'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'예기치 않은 오류 발생: {str(e)}'})

@app.route('/signup', methods=['POST'])
def sign_up():
    try:
        id = request.form.get('id')
        password = request.form.get('password')
        gender = request.form.get('gender')
        age = request.form.get('age')

        # SQLite 연결 설정
        sqlite_conn = sqlite3.connect('bigdata.db')
        sqlite_cursor = sqlite_conn.cursor()

        # 데이터베이스에 저장
        sqlite_cursor.execute("INSERT INTO users (id, password, gender, age) VALUES (?, ?, ?, ?)", (id, password, gender, age))
        sqlite_conn.commit()

        return jsonify({'status': 'success'})

    except sqlite3.Error as e:
        return jsonify({'status': 'error', 'message': f'SQLite 에러: {str(e)}'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': f'예기치 않은 오류 발생: {str(e)}'})
    finally:
        if 'sqlite_conn' in locals():
            sqlite_conn.close()   
   
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    # 로그인 쿼리 실행
    query = "SELECT * FROM {} WHERE id = ? AND password = ?".format(user_table)

    sqlite_cursor.execute(query, (username, password))
    result = sqlite_cursor.fetchone()

    if result:
        return redirect(url_for('bp1'))
    else:
        flash('로그인 실패.')
        return render_template('bplogin.html')

@app.route('/bp1')
def bp1():
    global start_date
    start_date = session.get('start_date')
    start_date2=session.get('start_date2')
    end_date = session.get('end_date')
    se_date = session.get('se_date')
    return render_template('bp1.html', start_date=start_date, end_date=end_date,  se_date=se_date,start_date2=start_date2)

@app.route('/information')
def information():
    return render_template('information.html')
@app.route('/save_survey_data_to_main', methods=['POST'])
def save_survey_data_to_main():
    try:
        data = request.get_json()  # JSON 데이터를 가져옴

        # 여행자 정보를 세션에 저장
        session['survey_data'] = {
            'age': data['age'],
            'relationship': data['relationship'],
            'gender': data['gender']
        }

        return jsonify({'status': 'success', 'survey_data': session['survey_data']})  # 응답을 JSON 형태로 보냄

    except Exception as e:
        return jsonify({'status': 'error', 'message': f'An unexpected error occurred: {str(e)}'})
    
@app.route('/save_survey_data', methods=['POST'])
def save_survey_data():
    try:
        age = int(request.form.get('Age'))
        
        # 관계와 성별을 정수로 변환
        relationship_mapping = {'혼자': 1, '연인': 2, '친구': 3, '가족': 4}
        selected_relationship = request.form.get('relationship')
        relationship = relationship_mapping.get(selected_relationship, 0)

        gender_mapping = {'남': 1, '여': 2}
        gender = gender_mapping[request.form.get('radio-buttons')]

        # 세션에 데이터 저장
        session['survey_data'] = {'age': age, 'relationship': relationship, 'gender': gender}

        # 데이터를 문자열로 만듦
        result_string = f'나이: {age}, 관계: {relationship}, 성별: {gender}'

        # 문자열 대신에 bpselect.html을 렌더링하도록 수정
        return render_template('bpselect.html', result_string=result_string, start_date=start_date)

    except Exception as e:
        return render_template('error.html', error_message=f'An unexpected error occurred: {str(e)}')

@app.route('/bpselect', methods=['GET'])
def bpselect():
    global datecount
    survey_data = session.get('survey_data', {})  # survey_data 세션에서 가져오기
    return render_template('bpselect.html', survey_data=survey_data, datecount=datecount, se_date=se_date)

@app.route('/increase_datecount', methods=['POST'])
def increase_datecount():
    global datecount
    datecount += 1
    return jsonify({'success': True, 'datecount': datecount})

@app.route('/update_date', methods=['POST'])
def update_date():
    global se_date
    data = request.get_json()
    print('Received data:', data)  # 추가된 부분
    se_date = data.get('start_date')
    se_date = datetime.strptime(se_date, '%Y-%m-%d')
    se_date = se_date + timedelta(days=1)
    session['se_date']=se_date
    return jsonify({'success': True, 'se_date': se_date})


@app.route('/save_selected_location', methods=['POST'])
def save_selected_location():
    global selected_location_name

    selected_location_name = request.form.get('selected_location')
    return jsonify({'status': 'success'})

@app.route('/get_attraction_name', methods=['POST'])
def generate_google_map_link():
    place_address = request.form.get('place_address')
    place_name = selected_location_name

    query = f'{place_name}, {place_address}'
    map_link = f'https://www.google.com/maps?q={query.replace(" ", "+")}'   
    return jsonify({'status': 'success', 'map_link': map_link})

@app.route('/get_attraction_name', methods=['GET'])
def get_attraction_name():
    global selected_location_name

    if selected_location_name is not None:
        query = "SELECT ATTRACTION_NAME FROM SPOT WHERE LOCATION_ID = ?"

        sqlite_cursor.execute(query, (selected_location_name,))
        result = sqlite_cursor.fetchall()

        # result를 리스트로 변환하여 반환
        attraction_names = [item[0] for item in result]
        
        return jsonify({'status': 'success', 'attraction_names': attraction_names})
    else:
        return jsonify({'status': 'error', 'message': 'No selected location'})

@app.route('/set_attraction', methods=['GET'])
def set_attraction():
    recommended_attractions = get_recommendations()['attraction_names']
    current_attractions = get_attraction_name()['attraction_names']
    # 중복 제거 후 추천 목록과 일치하도록 수정
    updated_attractions = list(set(current_attractions) - set(recommended_attractions))
    return jsonify({'status': 'success', 'attraction_names': updated_attractions})

def get_recommendations_for_main(user_gender, user_age, user_relationship, user_destination):
    # 여기도 SQLite 연결로 변경
    sqlite_conn = sqlite3.connect('bigdata.db')
    sqlite_cursor = sqlite_conn.cursor()

    query = f"SELECT ID, 관광지, 성별, 나이, 관계, 평점, 지역 FROM GRADE WHERE 지역 = ?"
    df_sqlite = pd.read_sql(query, sqlite_conn, params=(user_destination,))

    reader = Reader(rating_scale=(1, 5))
    surprise_data = Dataset.load_from_df(df_sqlite[['ID', '관광지', '평점']], reader)

    trainset, testset = train_test_split(surprise_data, test_size=0.2, random_state=42)

    model = SVD()
    model.fit(trainset)

    user_id = df_sqlite['ID'].max() + 1
    user_recommendations = []

    for attraction_id in df_sqlite['관광지'].unique():
        if not df_sqlite[(df_sqlite['ID'] == user_id) & (df_sqlite['관광지'] == attraction_id)].empty:
            continue

        prediction = model.predict(user_id, attraction_id, r_ui=None, clip=False)

        user_recommendations.append({'관광지': attraction_id, '예상평점': prediction.est})

    user_recommendations = sorted(user_recommendations, key=lambda x: x['예상평점'], reverse=True)[:3]

    sqlite_cursor.close()
    sqlite_conn.close()

    return user_recommendations

@app.route('/get_recommendations', methods=['GET'])
def get_recommendations():
    # 세션에서 필요한 정보 가져오기
    user_gender = session.get('survey_data', {}).get('gender')
    user_age = session.get('survey_data', {}).get('age')
    user_relationship = session.get('survey_data', {}).get('relationship')
    user_destination = selected_location_name

    # 함수 호출 및 결과 받기
    recommendations = get_recommendations_for_main(user_gender, user_age, user_relationship, user_destination)
    attraction_names = [recommendation['관광지'] for recommendation in recommendations]
    return jsonify({'status': 'success', 'attraction_names': attraction_names})

@app.route('/bpsleep')
def bpsleep():
    return render_template('bpsleep.html')



def nearest_neighbor_tsp(coords):
    
    def haversine_distance(coord1, coord2):
        R = 6371  # 지구의 반지름 (단위: km)
        lat1, lon1 = math.radians(coord1[0]), math.radians(coord1[1])
        lat2, lon2 = math.radians(coord2[0]), math.radians(coord2[1])

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

        distance = R * c
        return distance

    num_coords = len(coords)
    unvisited = set(range(1, num_coords))  
    current_city = 0

    tour = [current_city]

    while unvisited:
        nearest_city = min(unvisited, key=lambda city: haversine_distance(coords[current_city], coords[city]))
        tour.append(nearest_city)
        unvisited.remove(nearest_city)
        current_city = nearest_city

    return tour


@app.route('/update_selected_attractions', methods=['POST'])
def update_selected_attractions():
    data = request.get_json()
    global selectedAttractions
    selectedAttractions = data.get('selectedAttractions', [])

    return jsonify({'status': 'success'})

selectedAttractions = None
dayAttractions=[]
daylocated=[]
selectedModes=None
daymode=[]
@app.route('/process_selected_attractions', methods=['POST'])
def process_selected_attractions():
    global selectedAttractions
    global selected_location_name
    global selectedModes
    data = request.get_json()
    selectedAttractions = data.get('selectedAttractions')
    selectedModes= data.get('selectedModes')
    daymode.append(selectedModes)
    print(daymode)
    selectedAttractions=ast.literal_eval(selectedAttractions)
    selectedAttractions = list(reversed(selectedAttractions))
    print(selectedAttractions)
    coordinates = []

    for attraction in selectedAttractions:
    # Geocoding API request
        
        geocode_result = gmaps.geocode('%s,%s'%(attraction,selected_location_name))

    # Extracting coordinates
        if geocode_result and 'geometry' in geocode_result[0] and 'location' in geocode_result[0]['geometry']:
            location = geocode_result[0]['geometry']['location']
            coordinates.append((location['lat'], location['lng']))
            print(coordinates)
    optimal_tour = nearest_neighbor_tsp(coordinates)
    selectedAttractions=[selectedAttractions[i] for i in optimal_tour]
    selectedAttractions = list(reversed(selectedAttractions))
    print(selectedAttractions)
    dayAttractions.append(selectedAttractions)
    daylocated.append(selected_location_name)
    print(dayAttractions)
    print(daylocated)
    session['daylocated']=daylocated
    print(session['daylocated'])
    session['dayAttractions']=dayAttractions
    session['daymode']=daymode
    return jsonify(result='Success', daymode=daymode)



@app.route('/bpmove')
def bpmove():
    return render_template('bpmove.html')

@app.route('/bpmove_last')
def bpmove_last():
    return render_template('bpmove_last.html')

@app.route('/bptable')
def bptable():
    
    dayAttractions = session.get('dayAttractions', [])
    daylocated = session.get('daylocated', [])
    daymode=session.get('daymode',[])
    return render_template('bptable.html', dayAttractions=dayAttractions, daylocated=daylocated,daymode=daymode)

if __name__ == '__main__':
    app.run(port=10000, debug=False, host='0.0.0.0', threaded=False)