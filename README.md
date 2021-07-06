[Milyoona IPG](https://www.milyoona.com/) implementation in Node.JS
* Easy to Use
* Expressjs compatible


## 🕹 Usage
Install the package from `npm` or `yarn` and require it in your Node project:
```bash
npm install milyoona-ipg
# or
yarn add milyoona-ipg
```

```javascript
const MilyoonaIpg = require('milyoona-ipg');
// or
import MilyoonaIpg from 'milyoona-ipg';
```

Then create an instance:
```javascript
/**
 * Create Milyoona
 * @param {String} `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` [Terminal ID]
 */
const Milyoona = new Milyoona('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
```

## 📢 API
### ★ Token Request:
```javascript
/**
 * Build and prepare transaction URL
 * @param {number} amount Transaction's Amount
 * @param {string} callbackURL User will redirect to this URL to check transaction status
 * @param {string} [null] Order ID or Invoice Number
 * @param {string} [null] Mobile Number
 * @param {string} [null] National Code
 * @param {string} [null] Payment Card Number
 * @param {string} [null] Description
 * @throws Will throw an error if URL building isn't successfull.
 */
 Milyoona.token(amount, callbackURL, orderId, mobile, nationalCode, cardNo, description).then(response => {
   if (response.status === 200) {
    console.log(response);
   }
 }).catch(err => {
   console.error(err);
 });
```

### ★ Payment Verification:
```javascript
/**
 *
 * @param {string} token Payment Request Token
 */
 Milyoona.verify(token).then(response => {
   if (response.status === 200) {
    console.log(response);
   }
 }).catch(err => {
   console.error(err);
 });
```
### ★ Payment Trace:
```javascript
/**
 *
 * @param {string} token Payment Request Token
 */
 Milyoona.trace(token).then(response => {
   if (response.status === 200) {
    console.log(response);
   }
 }).catch(err => {
   console.error(err);
 });
```


## 👋 Contribution
Contributions are welcome. Please submit PRs or just file an issue if you see something broken or in
need of improving.
