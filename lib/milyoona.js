class Milyoona
{
    /**
     * Get the API Key
     * @param {string} terminal Your Terminal Id.
     * @throws Will throw an error if the Terminal Id isn't string.
     */
    constructor(terminal){
        if(terminal != '' && typeof terminal === 'string'){
            this.request = require('request');
            this.terminal = terminal;
            this.tokenEndPoint = 'https://api.milyoona.com/payment/token';
            this.verifyEndPoint = 'https://api.milyoona.com/payment/verify';
            this.traceEndPoint = 'https://api.milyoona.com/payment/trace';
            this.gateway = 'https://api.milyoona.com/ipg/';
        }
        else
            throw new Error('You should pass your Pay.ir API Key to the constructor.');
    }


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
    token(amount, callbackURL, orderId, mobile, nationalCode, cardNo, description){
        const $this = this;
        orderId = orderId || null;
        mobile = mobile || null;
        nationalCode = nationalCode || null;
        description = description || null;

        return new Promise((resolve, reject) => {
            if(typeof amount !== 'number' || amount < 1000)
                throw new Error('Transaction\'s amount must be a number and equal/greater than 1000');
            else if(typeof callbackURL !== 'string' || callbackURL.length < 5)
                throw new Error('Callback (redirect) URL must be a string.');
            else if(callbackURL.slice(0,4) != 'http')
                throw new Error('Callback URL must start with http/https');
            this.request.post({
                url: this.tokenEndPoint,
                form: {terminal: $this.terminal, amount: amount , callback_url: callbackURL, order_id: orderId}
            }, (error, response, body) => {
                if(error)
                    reject(error.code);
                else if(response.statusCode != 200)
                    reject(new Error('Request status code was not OK.'));
                else if(typeof body != 'undefined' && JSON.parse(body).status != 1)
                reject(JSON.parse(body).message);
            resolve(JSON.parse(body));
            });
        });
    }


    /**
     *
     * @param {string} token Payment Request Token
     */
    verify(token){
        const $this = this;
        return new Promise((resolve, reject) => {
            if(!token || typeof token !== 'string')
                throw new Error('token is not valid.');

            this.request.post({
               url: this.verifyEndPoint,
               form: {terminal: $this.terminal, token: token}
            }, (error, response, body) => {
                if(error)
                    reject(error.code);
                else if(response.statusCode != 200)
                    reject(new Error('Request status code was not OK.'));
                else if(typeof body != 'undefined' && JSON.parse(body).status != 1)
                    reject(JSON.parse(body).message);
                resolve(JSON.parse(body));
            });
        });
    }


        /**
         *
         * @param {string} token Payment Request Token
         */
        trace(token){
            const $this = this;
            return new Promise((resolve, reject) => {
                if(!token || typeof token !== 'string')
                    throw new Error('token is not valid.');

                this.request.post({
                   url: this.traceEndPoint,
                   form: {terminal: $this.terminal, token: token}
                }, (error, response, body) => {
                    if(error)
                        reject(error.code);
                    else if(response.statusCode != 200)
                        reject(new Error('Request status code was not OK.'));
                    else if(typeof body != 'undefined' && JSON.parse(body).status != 1)
                        reject(JSON.parse(body).message);
                    resolve(JSON.parse(body));
                });
            });
        }



}

module.exports = Milyoona;
