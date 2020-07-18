let x = navigator.geolocation
x.getCurrentPosition(success, failure)
const mykey = config.API_KEY;

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    document.getElementById("lat").innerHTML = latitude
    document.getElementById("long").innerHTML = longitude


    let coords = new google.maps.LatLng(latitude, longitude);
    let mapOptions = {
        zoom: 9,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    let marker = new google.maps.Marker({ map: map, position: coords });

    //----------------------------Get api call to get address----------------------------------------------
    const Http = new XMLHttpRequest();
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + "," + longitude + '&key=' + mykey;
    Http.open("GET", url);
    Http.send();

    //parse the json
    Http.onreadystatechange = (e) => {
        var objArray = [];
        let response = Http.responseText;
        let obj = JSON.parse(response)
        objArray.push(obj)
        let address = objArray[0].results[5].formatted_address
        document.getElementById("address").innerHTML = address
    }
}


function failure() {
    alert("The page you are looking for is not available, please try again...");
}