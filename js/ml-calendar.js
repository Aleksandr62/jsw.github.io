Vue.component('ml-calendar', {
  data() {
    return {
	styles: null,
	uidComp: this.$options._componentTag,
	isVisibleCalendar: false,
	dayOfWeek: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС',],
	selectRange: {start: this.dateNow, end: this.dateNow},
	curDate: {year: (new Date()).getFullYear(), month: (new Date()).getMonth(), date: (new Date()).getDate()},
    };
  },
  template: `
    	<div class="calendar-box" :data="uidComp">
	<button class="calendar__button__show" :data="uidComp" @click="isVisibleCalendar = !isVisibleCalendar">Открыть</button>
		<table class="calendar" :data="uidComp" v-show="isVisibleCalendar">
			<ml-calendar-header :curMonth="curDate.month" :year="curDate.year" :dayOfWeek="dayOfWeek" :uidComp="uidComp"></ml-calendar-header>
			<ml-calendar-row ref="mlCalendarRow" v-for="week of curMonthDates" :key="Math.floor(Math.random() * 10000)" :year="curDate.year" :month="curDate.month" :week="week" :uidComp="uidComp"></ml-calendar-row>
		</table>
    	</div>
	`,
  computed: {
	dateNow() {
		return new Date();
	},
	curDayWeek() {
		return this.dateNow.getDay();
	},
	countDaysOfMonth() {
		return (new Date(this.curDate.year, this.curDate.month + 1, 0)).getDate();
	},	
	firstDayCurMonth() {
		return new Date(this.curDate.year, this.curDate.month, 1);
	},
	firstDayMonth() {
		return new Date(this.curDate.year, this.curDate.month, 1 - this.firstDayCurMonth.getDay() + 1);
	},
	curMonthDates() {
		const arrMonth = [];
		let date = new Date(this.curDate.year, this.firstDayMonth.getMonth(), this.firstDayMonth.getDate());;
		for(let y = 0; date.getMonth() <= this.curDate.month ;y++) {
			arrMonth.push([]);
			for(let i = 0; i < 7; i++) {
				arrMonth[arrMonth.length - 1].push(new Date(date)); 
				date.setDate(date.getDate() + 1);
			}
		}
		return arrMonth;
	},
  },
  methods: {
	prev() {
		if(this.curDate.month > 0) this.curDate.month--;
		else {
			this.curDate.month = 11;
			this.curDate.year--;
		}
	},
	next() {
		if(this.curDate.month < 11) this.curDate.month++;
		else {
			this.curDate.month = 0;
			this.curDate.year++;
		}
	},
  },
  beforeCreate() {},
  created() {
    this.$root.setStyle(this);

  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
});


Vue.component('ml-calendar-header', {
  props: ["curMonth", "year", "dayOfWeek", "uidComp"],
  data() {
    return {
	month: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',],
    };
  },
  template: `
	<tr class="calendar__header" :data="uidComp">
		<td class="calendar__data__cell" :data="uidComp" @click="$parent.prev()"><</td>
		<td class="calendar__data__cell" :data="uidComp" :colspan="dayOfWeek.length - 2">{{ month[curMonth] }}</td>
		<td class="calendar__data__cell" :data="uidComp" @click="$parent.next()">></td>
	</tr>
	`,
});

Vue.component('ml-calendar-row', {
  props: ["week", "uidComp"],
  data() {
    return {

    };
  },
  template: `
	<tr class="calendar__data__row" :data="uidComp">
		<ml-calendar-cell v-for="date of week" :key="+date" :year="date.getFullYear()" :month="date.getMonth()" :date="date" :uidComp="uidComp"></ml-calendar-cell>
	</tr>
	`,
});

Vue.component('ml-calendar-cell', {
  props: ["date", "uidComp"],
  data() {
    return {

    };
  },
  template: `
	<td class="calendar__data__cell" :data="uidComp">
		{{date.getDate()}}
	</td>
	`,
});