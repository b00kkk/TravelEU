from sqlalchemy.orm import Session
from models import Grade, Spot
from surprise import Dataset, Reader, SVD
import pandas as pd
from typing import List

def get_spots(db: Session, location_id: str):
    return db.query(Spot).filter(Spot.location_id == location_id).all()

def load_grade_data(db: Session, region: str):
    results = db.query(Grade).filter(Grade.region == region).all()
    grades = [{
        'id': grade.id,
        'attraction_name': grade.attraction_name,
        'rating': grade.rating
    } for grade in results]
    return pd.DataFrame(grades)

def train_svd_model(data):
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(data[['id', 'attraction_name', 'rating']], reader)
    trainset = data.build_full_trainset()
    model = SVD()
    model.fit(trainset)
    return model

def get_recommended_spots(db: Session, region: str, gender: int, age: int, relationship: int):
    data = load_grade_data(db, region)
    model = train_svd_model(data)

    # 여기서 새로운 사용자 프로필을 생성하는 대신 실제 사용자 특성을 반영
    user_profile = f"{gender}-{age}-{relationship}"
    recommendations = []

    for attraction in data['attraction_name'].unique():
        prediction = model.predict(user_profile, attraction, r_ui=None, clip=True)
        recommendations.append({'attraction_name': attraction, 'estimated_rating': prediction.est})

    recommendations = sorted(recommendations, key=lambda x: x['estimated_rating'], reverse=True)[:5]
    print(recommendations)
    return recommendations

def get_spots_coordinates(spots: List[str], db: Session):
    print(f"Querying for spots: {spots}")  # 쿼리할 데이터 출력
    results = db.query(Spot).filter(Spot.attraction_name.in_(spots)).all()
    print(f"Query results: {results}")  # 데이터베이스 쿼리 결과 출력

    if not results:
        print("No results found for the given spots.")
        return []

    return [
        {"latitude": spot.latitude, "longitude": spot.longitude}
        for spot in results
    ]
