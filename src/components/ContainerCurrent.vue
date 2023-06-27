<template>
  <v-card
    class="mx-auto"
    max-width="344"
    variant="outlined"
  >
    <v-card>
      <div>
        <div class="text-h4 mb-1">
        {{name}} 
        </div>
        <div class="text-h7 mb-1">
         {{ time | moment("ddd, h:mm a ") }}
        </div>
        <div class="text-h1 mb-1">
        {{temp}}<img :src="url()">
        </div>
       <div lass="text-h2 mb-1">

        {{max}}
      </div>
         <div lass="text-h2 mb-1">

        {{min}}
      </div></div>
    </v-card>
    <v-card-actions>
      <v-btn variant="outlined">
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'

export default{
	name: 'ContainerCurrent',
	data (){
		return{
			temp: '',
			name: '',
			weatherIcon: '',
			time: '',
			imgSrc: '',
			max:'',
			min:'',
		}
	},
	methods : {
 

            url: function(){
                return 'https://openweathermap.org/img/wn/'+this.weatherIcon[0].icon+'@2x.png'
            }
       
        },
	watch:{},
	mounted () {
    axios
    .get(
      'https://api.openweathermap.org/data/2.5/weather?lat=27.496&lon=-82.59&units=imperial&appid=801e74b46fc1681e6688cc0d730ba1ba')
    .then(response =>{
      this.temp = response.data.main.temp
      this.max = response.data.main.temp_max
      this.min = response.data.main.temp_min
      this.name = response.data.name
      this.weatherIcon = response.data.weather
      this.time = response.data.dt
    })
  },
	props: {


	}
}



</script>