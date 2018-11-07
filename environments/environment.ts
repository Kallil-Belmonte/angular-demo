// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  jsonPlaceholder: 'https://jsonplaceholder.typicode.com/',
  mocky: 'http://www.mocky.io/v2/'
};

export const endpoints = {
	blog: {
    categories: '5bb20b802e00009015927389/',
		posts: 'posts/'
	},
  contactForm: {
    favoriteColors: '5bbb65983100004d00149011/'
  },
  auth: {
    login: '5bd312b23400002a00cfe028/',
    register: '5bd311fc3400006f00cfe021/'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
