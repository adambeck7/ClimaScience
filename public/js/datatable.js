$('#table').hide();
new Vue({
    el: '#chartarea',
    data: {
        message: 'Hello, world!',
        lat: '39.742043',
        lng: '-104.991531',
        select: [],
        data: []
    },
    methods: {
        getData(){
            for (let i = 0; i < this.select.length; i++){
                let q = this.select[i];
                $.get('https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/' + this.lat + ',' + this.lng, result => {
                    console.log(result);
                    for (let i = 0; i < result.hourly.data.length; i++){
                        let datum = {
                            time: '',
                            res: ''
                        }

                        let time = new Date(result.hourly.data[i].time * 1000);
                        let hours = time.getHours();
                        let minutes = "0" + time.getMinutes();
                        let formatted = hours + ':' + minutes;
                        datum.time = formatted;


                        datum.res = result.hourly.data[i][q];
                        this.data.push(datum);
                    }
                    console.log(this.data);
                    $('#table').show();
                });
            }
        }
    }
});