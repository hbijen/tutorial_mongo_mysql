## Running the application

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
# start with mongodb dependency
npm run mongo

# start with mysql dependency
npm run mysql

# or start the server and open the app in a new browser tab
npm run mongo -- --open
npm run mysql -- --open
```

## List of FIXME

Search for FIXME and update the queries to make the corresponding functionality work. Build an incremental query concept. Over 25+ FIXME.

Following are some examples

| FIXME | concept |
|-- |-- |
| get first 10 country records | limit |
| fetch only the fields that are displayed on the UI | projection or retrieve specific columns/fields |
| return the total count of the country collection | counting no of records |
| Fix the pagination for the country, use find() or aggregate() | limit,skip for pagination |
| Adding sorting based on the header click | sorting data |
| get the first 10 cities | aggregate pipeline, working with array objects |
| return the total count of all the cities | group based on a field |
| Fix the pagination for the city| working with nested values |
| get first 20 country records sorted by population| intro to charts with simple data  |
| create country| Insert new record (CRUD) |
| update country| Updating existing record (CRUD)|
| delete country| Deleting existing record (CRUD)|
| search by country name| find by name (CRUD) |
| advanced search by different country attributes| how to mix multiple search attributes|
| show the languages spoken in a country as a pie chart| another charts to show percentage data |
| show official language of a country| data from multple tables (mysql) or nested array objects (mongo) |
| Order the countries by number of languages spoken in it| aggregate data projection 1 |
| Order the language based on number of countries speaking it| aggregate data projection 2 |
| Continent Summary | using multiple queries in a single report |
| Population and Surface Area comparison | multi dimensional data representation |
| Population of each State | Working with Choropleth Maps |


