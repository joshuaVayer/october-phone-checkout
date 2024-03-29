# october-phone-checkout

Express.js server built with typescript and node.js.

## Installation

1. Clone the repo

   ```sh
   git clone git@github.com:joshuaVayer/october-phone-checkout.git
   cd october-phone-checkout
   ```

2. Install dependencies.

   ```sh
   yarn install
   ```

3. Run the server.

    ```sh
    yarn dev
    ```

    OR

    ```sh
    yarn build && yarn start
    ```
4. Add your .env file to the root of the project.
   ```
   PORT=8080
   SOCIETE_INFO_API_KEY=DEMO
   ```
   You can generate your own Societe Info API key at [https://societeinfo.com/](https://societeinfo.com/)
  <hr>
  <div>
    <h2>Usage :</h2>
    <p>Head up to the <code>http://localhost:8080/phone-number/</code> route to start searching</p>
    <p>
      Available query parameters:
      <ul>
        <li><code>registrationNumber</code> - The company registration number. If provided nothing else will be used</li>
        <li><code>companyName</code> - The company name. Should be use with the postalCode parameter</li>
        <li><code>postalCode</code> - The company postal code</li>
      </ul>
      <strong>You should provid at least <code>registrationNumber</code> or <code>companyName</code></strong>
    </p>
  </div>
  <hr>
  <div>
    <h2>Examples :</h2>
    <ul>
      <li>
        <a href="http://localhost:8080/phone-number/?registrationNumber=702012931">
          <code>http://localhost:8080/phone-number/?registrationNumber=702012931</code>
        </a>
      </li>
      <li>
        <a href="http://localhost:8080/phone-number/?companyName=SOC%20EXPLOITATION%20SPECTACLES%20BATACLAN">
          <code>http://localhost:8080/phone-number/?companyName=SOC%20EXPLOITATION%20SPECTACLES%20BATACLAN</code>
        </a>
      </li>
      <li>
        <a href="http://localhost:8080/phone-number/?companyName=SOC%20EXPLOITATION%20SPECTACLES%20BATACLAN&postalCode=75011">
          <code>http://localhost:8080/phone-number/?companyName=SOC%20EXPLOITATION%20SPECTACLES%20BATACLAN&postalCode=75011</code>
        </a>
      </li>
    </ul>
  </div>
  <hr>
  <div>
    <h2>Response :</h2>
    <p>
      The succcessfull response will be a JSON with the following shape:
      <div>
         <code >
            {
               "success": true,
               "status": "success",
               "search_strategy": "company_name",
               "result": {
               "phones": [
                  {
                     "value": "01 43 14 00 30"
                  },
                  {
                     "value": "06 89 97 55 79"
                  }
               ]
               }
            }
         </code>
      </div>
    </p>
    <p>If you get too many results after providing only the company name the server will return the corresponding hits. You will then be able to retry, adding the postal code for example or with a more precise name </p>
  </div>