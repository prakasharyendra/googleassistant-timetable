# googleassistant-timetable
My time table schedule integrated with google assistant

When a user calls Google Assistant, a request is sent to Dialogflow (earlier called Api.Ai), which proccesses the request for natural language and sends the accurate request data to Firebase functions which does some magic and return the response line. 

This is based upon batch timetable for Galgotias University and mess timetable for hostel.

# Installation

Firebase
<ol>
<li>Create a new firebase project
<li>Use command line to upload database and cloud functions
</ol>
Dialogflow
<ol>
<li>Edit dialogflow/agent.json
<li>Add your webhook url in place of <b>WEBHOOK</b>
<li>Add your project ID in place of <b>GAPROJECTNAME</b>
<li>zip the files under dialogflow and import it in your assistant project on dialogflow
</ol>

Finally integrate it with Google Assistant under the Integration tab in Dialogflow
