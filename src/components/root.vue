<template>
  <section class="row">
    <section class="col-md-8 col-lg-9 col-12">
      <gmap-map
        :center="currentPlace"
        :zoom="16"
        :options="{styles: mapStyle}"
        class="carte">

        <gmap-marker :position="search" />
        <gmap-marker :position="{ 'lat': 48.387465, 'lng': -4.486872 }" :label="{text: 'Groupe Océanic', color: '#dd2e44'}" :icon="{ path: 'M0,5a5,5 0 1,0 10,0a5,5 0 1,0 -10,0', fillColor: '#dd2e44', fillOpacity: 1, strokeWeight: 0, scale: 1.2, labelOrigin: {x: 5 , y: -10}}"></gmap-marker>

        <gmap-marker
          :key="index"
          v-for="(l, index) in filterLocations"
          :position="l"
          :label="{text: l.meta.name, color: '#6c63ff', fontSize: '10px'}"
          :icon="{anchor: {x: 9, y: 11}, path: 'M3 0v6l1 2v8h3v-8l1-2v-6h-1v5h-1v-5h-1v5h-1v-5h-1zm7 0v16h2l-1-7 2-5-3-4z', fillColor: '#6c63ff', fillOpacity: 1, strokeWeight: 0, scale: 1.2 , labelOrigin: {x: 5, y: 25}}"
          @click="resto = l.meta, currentPlace = l"
        ></gmap-marker>

      </gmap-map>

      <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
      <button @click="addMarker">Ajouter un nouveau</button>

    </section>
    <section v-if="!showListe" class="col-md-4 col-lg-3 col-12 mt-2">
      <em class="btn" @click="showListe = true">Afficher la liste</em>
      <h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="30" height="30"><path fill="#6c63ff" d="M12.636 14.813c-.328-4.762-.69-9.52-.943-14.288-.024-.94-1.379-.458-1.524.196-.247.855-.286 1.756-.455 2.629-.132.943-.322 1.882-.404 2.828.039.747.804 1.304 1.527 1.208.06.569-.075 1.211-.084 1.807-.132 1.94-.286 3.879-.398 5.822.054.894 1.304 1.31 1.921.69.244-.226.386-.56.361-.892z"/><path fill="#6c63ff" d="M6.585 3.973l-.084-3.653c-.183-.708-.879-.072-.651.417l-.09 3.116c-.57.393-.36-.699-.408-1.017l-.072-2.603c-.198-.519-.774-.066-.639.351l-.078 3.188c-.252.537-.543-.18-.414-.486l-.081-3.053c-.198-.519-.774-.066-.636.351-.018 1.347-.087 2.696-.069 4.043.015.558.36 1.011.768 1.359.114.153.381.249.306.474-.198 2.828-.408 5.657-.597 8.485 0 .717.765 1.188 1.425 1.023.606-.108.957-.756.837-1.332l-.591-8.335c.429-.435.984-.828 1.062-1.485l.018-.84z"/></svg> {{resto.name}}</h3>
      <h4><svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 17.76 17.76"><path fill="#464a5f" d="M15.497 17.75s2.327-1.994 2.26-2.991c-.066-.931-2.26-2.327-3.523-2.659-1.329-.399-2.194.399-2.592.731-.465.332-.798.532-.798.532-2.393-.798-5.65-4.055-6.448-6.448 0 0 .266-.332.532-.731.332-.465 1.197-1.329.798-2.592-.399-1.263-1.728-3.457-2.725-3.59-.997-.066-2.991 2.26-2.991 2.26-.266 7.844 7.645 15.821 15.488 15.488zm-7.711-15.422c-.864 0-.864-1.263 0-1.263 2.393 0 4.653.931 6.315 2.592 1.662 1.662 2.659 3.922 2.659 6.315 0 .864-1.329.864-1.329 0 0-1.994-.798-3.922-2.26-5.384-1.396-1.396-3.324-2.194-5.384-2.26zm.066 2.792c-.864 0-.864-1.329 0-1.263 1.595 0 3.191.598 4.321 1.728 1.13 1.197 1.795 2.725 1.795 4.321 0 .864-1.329.864-1.329 0 0-1.263-.532-2.46-1.396-3.39-.931-.864-2.127-1.396-3.39-1.396z"/></svg> {{resto.tel}}</h4>
      <h5 class="light"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 207 280"><path fill="#7c7f90" d="M102.987 0c-57 0-102.983 45.983-102.983 102.983 0 55 64.983 143.017 102.983 177.017 39-33 104.009-123.017 104.009-177.017 0-57-47.009-102.983-104.009-102.983zm0 61.011c24 0 42.998 18.973 42.998 41.973 0 24-18.998 43.032-42.998 43.032-23 0-41.973-19.032-41.973-43.032 0-23 18.973-41.973 41.973-41.973z"/></svg> {{resto.adress}}</h5>
      <ul class="stars">
        <li v-for="i in 5" :key="i">
          <em v-if="i <= resto.stars" class="red">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 100 100"><path fill="#dd2e44" d="M27.063 5.847c-13.232.199-27.098 7.984-27.136 25.769-.067 30.883 50.073 62.878 50.073 62.878s50.14-31.995 50.073-62.878c-.069-31.617-43.823-31.62-50.073-13.611-2.734-7.879-12.645-12.313-22.937-12.158z"/></svg>
          </em>
          <em v-else>
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 100 100"><path fill="#464a5f" d="M27.063 5.847c-13.232.199-27.098 7.984-27.136 25.769-.067 30.883 50.073 62.878 50.073 62.878s50.14-31.995 50.073-62.878c-.069-31.617-43.823-31.62-50.073-13.611-2.734-7.879-12.645-12.313-22.937-12.158z"/></svg>
          </em>
        </li>
      </ul>
      <small class="light">Nombre de jeudi : <strong>6</strong></small><br/>
      <small>Dernier en date : <strong>{{ today | moment("dddd DD MMMM, YYYY") }}</strong></small>
    </section>
    <section v-else class="col-md-4 col-lg-3 col-12 mt-2 restos">
      <p>
        <label>Filtrer par nom :</label><br/>
        <input v-model="filter" />
      </p>
      <p>
      <label>Filtrer par plat :</label><br/>
        crepe - irlandais - gastro - exotic - vin
      </p>
      <ul>
        <li v-for="(l, index) in filterLocations" :key="index"><em class="btn" @click="{resto = l.meta, showListe = false, currentPlace = l}">{{l.meta.name}}</em></li>
      </ul>
    </section>
    <section class="col-12 mt-2">
      <button class="btn" @click="showPlaceOnMap()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20">
          <path d="M3 0v6l1 2v8h3v-8l1-2v-6h-1v5h-1v-5h-1v5h-1v-5h-1zm7 0v16h2l-1-7 2-5-3-4z" fill="#6c63ff" />
        </svg>
      </button>
      <p v-if="0">for add: {{search}} </p>
    </section>
  </section>

</template>

<script>

import { loc } from '../locations.js'
import { style } from '../mapstyle.js'
export default {
  name: 'GoogleMap',

  data () {
    return {
      search: {},
      places: [],
      locations: loc,
      mapStyle: style,
      currentPlace: { 'lat': 48.387465, 'lng': -4.486872 },
      resto: {
        name: 'Groupe Oceanic',
        tel: '02 98 43 44 44',
        adress: '22 rue de lyon',
        stars: 0
      },
      stars: [1, 1, 1, 0, 0],
      filter: '',
      showListe: false,
      showAll: false,
      today: new Date()
    }
  },

  mounted () {
    /**
    * this.geolocate()
    **/
  },
  computed: {
    filterLocations () {
      const search = this.filter.toLowerCase().trim()
      if (!search) return this.locations
      return this.locations.filter(l => l.meta.name.toLowerCase().indexOf(search) > -1)
    }
  },

  methods: {
    showPlaceOnMap () {
      if (!this.showAll) {
        let place = {'featureType': 'poi.business', 'elementType': 'labels.icon', 'stylers': [{'visibility': 'on'}]}
        this.mapStyle.push(place)
        this.showAll = true
      } else {
        this.mapStyle.splice(-1, 1)
        this.showAll = false
      }
    },
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          meta: {
            name: this.currentPlace.name,
            tel: this.currentPlace.formatted_phone_number,
            adress: this.currentPlace.formatted_address
          }
        }
        this.search = marker
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }
  }
}
</script>

<style>
h1, h2, h3, .btn {
  font-weight: normal;
  color: #6c63ff;
}
.btn {
  border:1px solid #9999;
}
.red{
  color: #dd2e44;
}

.stars{margin:0;padding:0;}
.stars li{
  display: inline;
  list-style: none;
  margin: 4px;
}
.light{
  color: #7c7f90;
}
.carte {
  width:100%;
  height: 50vh;
}
.restos {
  overflow-y: scroll;
  height: 100%;
  max-height: 600px;
}
.restos ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: block;
  height: 100%;
}
.restos ul li{
  margin: .4em 0;
}

@media (min-width:992px){
  .carte{
    height: 100vh;
    max-height: 600px;
  }
}
</style>
