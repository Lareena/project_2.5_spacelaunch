# project_2.5_spacelaunch
Space Missions: 1957 to 2020

	For this project we created an interactive dashboard, Space Missions using SQLite, Flask-powered APIs and JavaScript. Space_Corrected.csv was the data we used from a previous ETL assignment which contained over 4,000 records of data for space launches from all countries and includes recent launches from the company SpaceX. There was another file, SpaceMissions.csv but this only contained data for launches from the United States so, we decided to not run queries from this table. After we imported Space_Corrected.csv into SQLite and created a database we were able to execute create queries to parse through the data and bring up specific information we needed. We used Group by and the Where clause in SQL to filter our data by country and company name. After we created our queries, we created an engine and setup Flask in Python to be able to create specific Flask routes linked to each query. The three routes we created is what we would be using to 

Our three visualizations are shown on the main dashboard, Space Missions which includes one bar graph and one Pie chart (we are currently in the process of creating a third chart). The research questions we want answered using our visualizations; “Which countries have the most successful space launches?” “What percent of the total launches were successful?” and “Which company has the highest success rate for space launches?”.


SQLite:
We created a database, Space.db of all our space launch data by importing the Space_Corrected.cvs into SQLite. Then, we were able to execute three queries in SQL which filter and give us the specific data we needed to create three charts.
•	The number of Successful Launches per Country
•	The number of Launches for each Mission Status
•	The number of Successful Launches per Company


Python Flask-powered API:
We created three api routes (three sessions) in Python linked to the Space.db which we use to call information back from the launches.json. The launches.json contains the data for every launch from 1957 – 2020. The three routes we created to generate our information for the charts:
•	"/api/v1.0/successfullaunches"
•	"/api/v1.0/statusmission"
•	"/api/v1.0/company"


HTML:
We created an html file (index.html) in our templates folder. The html file is the Space Missions: 1957 to 2020 dashboard which has links to bootstrap and CSS stylesheets. The <title> for the tab is Space Missions. We added a background image from a URL to show an outer space appearance. Also, we added a navigation bar to the top of the dashboard which has links to the SpaceX website and ‘Company Data’ from our api route. Scripts implemented for this project:
•	<script src="https://d3js.org/d3.v6.min.js"></script>
•	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
•	<script src="{{ url_for('static', filename='js/app.js') }}"></script>

Javascript:
We created a ‘bar-plot’ and a ‘piechart’ in our app.js using our routes. We created a bar chart of the top ten countries using function and d3.json. The ‘piechart’ we used function and concole.log to create a visual representation of the number of launches per mission status out of all the records. (We are in the process of creating a third chart for the company route).
