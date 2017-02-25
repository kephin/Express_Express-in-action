new Vue({
  el: '#app',
  data: {
    place: '',
    heading: 'Where do you want to know the weather forecast?',
    button: 'Go',
    disableButton: false,
  },
  methods: {
    send() {
      this.disableButton = true;
      this.button = 'Loading...';

      axios.get(`/${this.place}`)
        .then(res => {
          this.heading = `It is ${res.data.temp} &#8451; in ${res.data.location}`;
          this.disableButton = false;
          this.button = 'Go';
          this.place = '';
        })
        .catch((err) => {
          this.heading = 'Cannot find the place.';
          this.disableButton = false;
          this.button = 'Go';
          this.place = '';
        });
    },
  },
});
