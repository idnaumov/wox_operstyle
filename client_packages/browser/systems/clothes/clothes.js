
var clothes = new Vue({
    el: '#clothes',
    data: {
        active: false,
        clicked: null,

        tClothType: [
            {
              type: 1,
              name: "Маски",
              items: [
                { name: "Свинья", price: "3500", clothId: 1, id: 1, colors: 1 },
                { name: "Череп", price: "2500", clothId: 1,  id: 2, colors: 1 },
                { name: "Обезьяна", price: "2500", clothId: 1,  id: 3, colors: 1 },
                { name: "Хаккейная", price: "2500", clothId: 1,  id: 4, colors: 1 },
                { name: "Обезьяна №2", price: "2500", clothId: 1,  id: 5, colors: 1 },
                { name: "Гоблин", price: "2500", clothId: 1,  id: 7, colors: 1 },
                { name: "Санта-клаус", price: "2500", clothId: 1,  id: 8, colors: 1 },
                { name: "Олень", price: "2500", clothId: 1,  id: 9, colors: 1 },
                { name: "Снеговик", price: "2500", clothId: 1,  id: 10, colors: 1 },
                { name: "Маска с длинным носом", price: "2500", clothId: 1,  id: 12, colors: 1 },
                { name: "Старая хоккейная маска", price: "2500", clothId: 1,  id: 14, colors: 1 },
                { name: "Черная хоккейная маска с рис.", price: "2500", clothId: 1,  id: 15, colors: 1 },
                { name: "Кот", price: "2500", clothId: 1,  id: 17, colors: 1 },
                { name: "Лиса", price: "2500", clothId: 1,  id: 18, colors: 1 },
                { name: "Сова", price: "2500", clothId: 1,  id: 19, colors: 1 },
                { name: "Енот", price: "2500", clothId: 1,  id: 20, colors: 1 },
                { name: "Медведь", price: "2500", clothId: 1,  id: 21, colors: 1 },
                { name: "Стервятник", price: "2500", clothId: 1,  id: 25, colors: 1 },
                { name: "Волк", price: "2500", clothId: 1,  id: 26, colors: 1 },
                { name: "Шапка пилота", price: "2500", clothId: 1,  id: 27, colors: 1 },
                { name: "Защитная маска", price: "2500", clothId: 1,  id: 28, colors: 1 },
                { name: "Маска черный череп", price: "2500", clothId: 1,  id: 29, colors: 1 },
                { name: "Маска 'Please Stop me'", price: "2500", clothId: 1,  id: 29, colors: 1 },
              ]
            },
            {
              type: 2,
              name: "Верхняя одежда",
              items: [
                { name: "Обычная футболка", price: "250", clothId: 11,  id: 1, bodyID: 0 },
                { name: "Белая ветровка", price: "250", clothId: 11,  id: 3, colors: 5, bodyID: 14 },
                // ... другие элементы для типа 2 ...
              ]
            },
            {
                type: 3,
                name: "Низ",
                items: [
                  { name: "[RL] Штаны Gucci", price: "250000" },
                  // ... другие элементы для типа 2 ...
                ]
            },
            {
                type: 4,
                name: "Аксессуары",
                items: [
                  { name: "[RL] Мужска цепь Argo", price: "250000" },
                  // ... другие элементы для типа 2 ...
                ]
            },
            {
                type: 5,
                name: "Майки",
                items: [
                  { name: "[RL] Майка Tomik Helfager", price: "250000" },
                  // ... другие элементы для типа 2 ...
                ]
            },
            // ... другие типы одежды ...
          ],
        selectedType: null,
        activateColors: false,
        maxColors: 0,

        currentColor: 0,
        currentCompID: 0,
        currentID: 0,
        currentBody: 0,
    },
    computed: {
      getCurrentItemName() {
        // if (this.selectedType !== null) {
        //   const typeData = this.tClothType.find(type => type.type === this.selectedType);
        //   if (typeData) {
        //     const item = typeData.items.find(item => item.clothId === this.currentCompID && item.id === this.currentID);
        //     if (item) {
        //       if (this.activateColors && item.colorsName) {
        //         return item.colorsName[this.currentColor - 1];
        //       } else {
        //         return item.name;
        //       }
        //     }
        //   }
        // }

        if ( this.activateColors !== false ) {
          
        } else {
          const typeData = this.tClothType.find(type => type.type === this.selectedType);
          const item = typeData.items.find(item => item.clothId === this.currentCompID);
          return item.name
        }
        return '';
      }
    },
    methods: {
        setPreviewCloth(clothId, id, bodyID, item) {
          this.currentColor = 1,
          this.maxColors = 1,
          this.checkColors(item),
          mp.trigger('Clothes_setPreview::CLIENT', clothId, id, this.currentColor, bodyID),
          this.currentCompID = clothId,
          this.currentID = id
          this.currentBody = bodyID
        },
        checkColors(item) {
          if (item.colors >= 2) {
            this.activateColors = true
            this.maxColors = item.colors;
          } else {
            this.activateColors = false
            this.maxColors = item.colors;
          } 
        },
        countPlus() {
          if ( this.currentColor == this.maxColors ) {
            this.currentColor = 1
          } else {
            this.currentColor = this.currentColor + 1
          }
          mp.trigger('Clothes_setPreview::CLIENT', this.currentCompID, this.currentID, this.currentColor, this.currentBody)
        },
        countMinus() {
          if ( this.currentColor == 1 ) {
            this.currentColor = 3
          } else {
            this.currentColor = this.currentColor - 1
          }
          mp.trigger('Clothes_setPreview::CLIENT', this.currentCompID, this.currentID, this.currentColor, this.currentBody)
        },
        closeButton() {
          mp.trigger('Clothes_close::CLIENT')
        },
        buyButton() {
          let data = this.tClothType[this.selectedType-1].items[this.clicked]
          console.log('test'+data.name)
          mp.trigger('Clothes_buy::CLIENT', data.name, data.clothId, data.id, this.currentColor, data.price)
        },
        loadCloth() {
          clicked = null
          activateColors = false
          mp.trigger('Clothes_loadCloth::CLIENT')
        }
    }
});