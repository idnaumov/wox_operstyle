
var fuelStation = new Vue({
    el: '#fuelStation',
    data: {
        active: false,

        veh_fuelType: [
            { name: "АИ-92", price: 4.5, type: 'vehicle' },
            { name: "АИ-95", price: 6.5, type: 'vehicle' },
            { name: "АИ-98", price: 10.5, type: 'vehicle' },
        ],

        literPrice: 0,
        allPrice: 0,

        fuelValue: 0,
        tank: 65,

        selectedFuel: false
    },

    methods: {
        changeFuelLiters() {
            this.$emit('changeFuelLiters', this.fuelValue);
        },

        selectFuelType() {
            if (this.selectedFuel || this.selectedFuel == 0) {
                console.log(this.selectedFuel)
                this.literPrice = this.veh_fuelType[this.selectedFuel].price,
                this.allPrice = this.literPrice * this.fuelValue
            } else if (this.selectedFuel == false) {
                return
            }
        },
        
        showFuelStation( fuel, tank ) {
            this.active = true;
            this.tank = tank - fuel;

            this.selectedFuel = false;
            this.fuelValue = 0;
        },

        hideFuelStation() {
            this.active = false
            this.literPrice = 0
            this.allPrice = 0
            this.fuelValue = 0
            this.tank = 65
            this.selectFuel = 0
        },

        buyFuel(type) {
            if (!type) return console.log(123)

            if (type == 'card') {
                mp.trigger('Fuel_buyFuel::CLIENT', type, this.fuelValue, this.allPrice);
                // console.log(type)
            } else if ( type == "nal" ) {
                mp.trigger('Fuel_buyFuel::CLIENT', type, this.fuelValue, this.allPrice);
            }
        }
    }
})

mp.events.add('showFuelStation::CEF', (fuel, tank) => {
    fuelStation.showFuelStation(fuel, tank)
})

mp.events.add('hideFuelStation::CEF', () => {
    fuelStation.hideFuelStation()
})

