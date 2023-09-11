
var carGarage = new Vue({
    el: "#carGarage",
    data() {
        return {
            active: false,

            vehList: [],
            selectedVeh: null,
        }
    },
    methods: {
        updateCars() {
            this.active = true;
        },

        setMarkerToVeh: function() {
            if (!this.selectedVeh) return
            
            let myobj = this.vehList[this.selectedVeh]
            myobj['selectedId'] = this.selectedVeh;
            mp.trigger('setBlip::CLIENT', JSON.stringify(this.vehList[this.selectedVeh])); 
        },

        setVehLocked: function() {
            if (!this.selectedVeh) return

            mp.trigger('LockVehicle::CLIENT', JSON.stringify(this.vehList));
        },

        deleteVeh: function() {
            if (!this.selectedVeh) return
            
            //
        },

        respawnVeh: function() {
            if (!this.selectedVeh) return
            
            let myobj = this.vehList[this.selectedVeh]
            myobj['selectedId'] = this.selectedVeh;
            mp.trigger('TOWTRUCK::CLIENT', JSON.stringify(this.vehList[this.selectedVeh]));
        },

        sellVehicle: function() {
            if (!this.selectedVeh) return
            
        },
    }
})

mp.events.add('cars_show::CEF', (arr) => {
    carGarage.vehList = JSON.parse(arr);
    carGarage.updateCars();
});

mp.events.add('cars_hide::CEF', () => {
    carGarage.vehList = [];
    carGarage.active = false;
    carGarage.selectedVeh = null;
});
