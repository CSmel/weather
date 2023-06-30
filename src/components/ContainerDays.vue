<template>
  <v-container class="mb-6">
    <v-card-actions class="d-flex justify-center mb-6 bg-surface-variant">

 <div  v-for="i in daysList" :key="i" >
  <div :class="today(i)">Today</div>
  <v-btn :class="activeDay(i)"><label><input type="radio" style="display: none;" v-model="selectedCategory"  :value="i.value" /> {{i.string}}</label></v-btn><br>
 </div>
 
    </v-card-actions>
   <v-col >
   <v-row>

  <v-card v-for="item in filteredDays(b)" :key="item.id" 
    class="px-10"
    max-width="344"
    variant="outlined"
  >    
    <v-card v-if="show" :val="item.main.temp_max">
      <div>
        <div class="text-overline mb-1">
       {{ item.dt_txt | moment("ddd, h:mm a ") }}

        </div>
        <div class="text-overline mb-1">
        {{item.main.temp_min}}
        {{item.main.temp_max}}  <img class="blob" :src="'https://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'"/>
        
        </div>
 </div>
    </v-card>
  </v-card>
</v-row>
</v-col>
</v-container>
</template>
<script>
import axios from 'axios'


export default{
  name: 'ContainerDays',

  data (){
    return{
      item: '',
      show: true,
      con: "0",
      selectedCategory: "",
      daysList: [
      {option: 'selectedCategory', value: 'All', string: 'All Days'},
      {option: 'selectedCategory', value: 1, string: 'Monday'},
      {option: 'selectedCategory', value: 2, string: 'Tuesday'},
      {option: 'selectedCategory', value: 3, string: 'Wednesday'},
      {option: 'selectedCategory', value: 4, string: 'Thursday'},
      {option: 'selectedCategory', value: 5, string: 'Friday'},
      {option: 'selectedCategory', value: 6, string: 'Saturday'},
      {option: 'selectedCategory', value: 0, string: 'Sunday'},
        ]
      
      

 
    }
  },computed:{

                 activeDay(){
                  var td = new Date().getDay();
                  return i =>{
                    if(i.value === td){
                      return 'active';
                    }
                    else{
                      return 'non-active'}
                  }

            
            },
            today(){
                  var td = new Date().getDay();
                  return i =>{
                    if(i.value === td){
                      return 'alert';
                    }
                    else{
                      return 'non-day'}
                  }
            },

  },

  methods : {
    convertDays(x){
      
      var cd = new Date(x).getDay();
   
      return cd

    },

            filteredDays() {
              var vm = this;
           
              var i ='';
              var u = vm.con;
              var category = vm.selectedCategory;
              var arr = vm.daysList;
              for (i = 0; i < arr.length; i++){
                if(category === "All"){
                  return vm.b;
                }
  
                else if(category === arr[i].value) {
                   return vm.b.filter(function(item) {
                  u = vm.convertDays(item.dt_txt)
                 
                 if (u === arr[i].value){                         
                     return item.dt_txt
                   }
                  return item.dt_txt.includes('17');
        });
                 
                  }
                }
    }

  },
  watch:{},
  mounted () {
        axios
    .get(
      'https://api.openweathermap.org/data/2.5/forecast?lat=27.496&lon=-82.59&units=imperial&appid=801e74b46fc1681e6688cc0d730ba1ba')
    .then(response =>{
      this.b = response.data.list
      this.daysTempMin = response.data.list.temp_min
      this.daysTempMax = response.data.list.temp_max
      this.weatherIcon = response.data.list.weather
     

    })
  },
  props: {
    temp: Number,
    description: String,
    location: String,
    b: Object,
    weatherIcon: Object,
    val: String,
    

  }
}



</script>
<style>

  .active {
    background-color: yellow !important;
  }

  .blob {
   animation: wobble 6s ease infinite;
}
.alert{
  border: 2px solid black;
  width: 60px;
}
.non-day{
  visibility: hidden;
}

@keyframes wobble {
    0%, 100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
    }

    15% {
        -webkit-transform: translateX(-32px) rotate(-10deg);
        transform: translateX(-32px) rotate(-10deg);
    }

    30% {
        -webkit-transform: translateX(calc(32px / 2)) rotate(10deg);
        transform: translateX(calc(32px / 2)) rotate(10deg);
    }

    45% {
        -webkit-transform: translateX(calc(-32px / 2)) rotate(calc(-10deg / 1.8));
        transform: translateX(calc(-32px / 2)) rotate(calc(-10deg / 1.8));
    }

    60% {
        -webkit-transform: translateX(calc(32px / 3.3)) rotate(calc(10deg / 3));
        transform: translateX(calc(32px / 3.3)) rotate(calc(10deg / 3));
    }

    75% {
        -webkit-transform: translateX(calc(-32px / 5.5)) rotate(calc(-10deg / 5));
        transform: translateX(calc(-32px / 5.5)) rotate(calc(-10deg / 5));
    }

}

</style>