const app = new Vue({
  el: '#app',
  data: {
	pathComponents: './js',
	uidComp: 'ml-app',
	blue: null,
  },
  template: `
	<div class="ml-container" theme="light" :data="uidComp">
	<header class="ml-header" :data="uidComp">
	        <div class="ml-logo" :data="uidComp">Модуль</div>
	</header>
	<main class="ml-main" :data="uidComp">
		<aside class="ml-main__left" :data="uidComp"></aside>
		<section class="ml-main__content" :data="uidComp">
			<ml-calendar ref="mlCalendar"></ml-calendar>
		</section>
		<aside class="ml-main__right" :data="uidComp"></aside>
	</main>
	<footer class="ml-footer" :data="uidComp">
	</footer>
	</div>
  `,
  methods: {
    getDataChart(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error))
    },
    setStyle(comp, url = comp.$options._componentTag) {
	comp.styles = document.createElement('link');
	comp.styles.setAttribute("rel", "stylesheet");
        comp.styles.setAttribute("type", "text/css");
	comp.styles.href = `${this.pathComponents}/${url}.css`;
	document.head.append(comp.styles);
    },
  },
  created() {
    this.setStyle(this, 'ml-app');

  },
});