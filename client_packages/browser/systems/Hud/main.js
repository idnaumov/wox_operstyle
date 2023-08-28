
var HUD = new Vue({
    el: '#HUD_main',
    data: {
        active: false,
        server: {
            online: 99,
            id: 1,
            time: '19:40',
            date: '19.08.2023',
        },
        player: {
            bonus: 1,
        },
        money: 52,
        bank: 1222222,
        tweenedNumber: 0,
        //
        notify: {
            notifys: [
            ],
            error_color: '240, 32, 32',
            succes_color: '66, 255, 0',
            info_color: '34, 202, 255'
        },
        notifyPos: {
            top: 300,
            width: 265
        },
        locationPosition: {
            top: 500,
            left: 130,
            location: 'Вайнвуд-хиллз',
            zone: 'Вайнвуд-хиллз'
        },
        hints: [
            { key: 'F6', text: 'Скрыть подсказки/худ' },
            { key: '`', text: 'Показать/Скрыть курсор' },
            { key: 'I', text: 'Инвентарь' },
            { key: 'N', text: 'Голосовой чат' },
            { key: 'L', text: 'Замок ТС' },
            { key: 'B', text: 'Зажигание ТС' },
            { key: 'J', text: 'Ремень безопасности' },
        ],
        usebutton: {
            active: false,
            button: 'E',
            text: 'Используйте для взаимодействия',
        },

        activeSpeedometer: true,
        carElements: {
            carlock: false,
            seatbelt: false,
            engine: false,
        },
        speedElements: {
            speed: '000',
            gear: "N"
        }
    },
    methods: {
        updateTime() {
            let data = new Date();
            let hour = data.getUTCHours() + 3;
            let minute = data.getMinutes();

            if (hour < 10) hour = "0" + hour;
            if ( hour == 24 ) hour = "00"
            if (minute < 10) minute = "0" + minute;
            this.server.time = `${hour}:${minute}`;
        },
        updateDate() {
            let data = new Date();
            let day = data.getDate();
            let month = data.getMonth() + 1;
            let year = data.getUTCFullYear();

            if (day < 10) day = "0" + day;
            if (month < 10) month = "0" + month;

            this.server.date = `${day}.${month}.${year}`;
        },
        addNotify(type, text, time) {
            var $this = this;
            if ( this.notify.notifys.length > 3 ) {
                this.notify.notifys.splice(0, 1);
            }
            if (type == 1) {
                this.notify.notifys.push({ type: 1, color: this.notify.succes_color, text: text });
            }
            else if (type == 2) {
                this.notify.notifys.push({ type: 2, color: this.notify.error_color, text: text });
            }
            else if (type == 3) {
                this.notify.notifys.push({ type: 3, color: this.notify.info_color, text: text });
            }
            // Удаление
            setTimeout(function () {
                $this.notify.notifys.pop()
            }, time)
        },
    },
    mounted() {
        setInterval(this.updateTime, 1000);
        this.updateDate();

        // this.usebutton.active = true;
    },
    computed: {
        animatedNumber: function () {
            return this.tweenedNumber.toFixed(0);
        }
    },
    watch: {
        money: function(newValue) {
            gsap.to(this.$data, { duration: 3, tweenedNumber: newValue });
          }
    }
})

mp.events.add('HUD_updateLocation::CEF', (top, left, location, zone) => {
    HUD.locationPosition.top = top;
    HUD.locationPosition.left = left;
    HUD.locationPosition.location = location;
    HUD.locationPosition.zone = zone;
})

mp.events.add('HUD_addNotification::CEF', (type, text, time) => {
    HUD.addNotify(type, text, time)
})
