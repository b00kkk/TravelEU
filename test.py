from geopy.geocoders import Nominatim
import gmaps
from IPython.display import display

def get_lat_lng(location_name):
    geolocator = Nominatim(user_agent="my_geocoder")
    location = geolocator.geocode(location_name)
    
    if location:
        latitude = location.latitude
        longitude = location.longitude
        return latitude, longitude
    else:
        return None

# 사용 예시
location_name = "서울 타워"
result = get_lat_lng(location_name)

if result:
    latitude, longitude = result
    locations = [(latitude, longitude)]  # Convert to a list of tuples
    gmaps.configure(api_key='AIzaSyC26KdaBpD_WPB6-jmXSIjuhcTxemLTlg8')  # Replace with your API key
    fig = gmaps.figure()
    markers = gmaps.marker_layer(locations)
    fig.add_layer(markers)

    # 지도 표시
    display(fig)
else:
    print("Location not found.")