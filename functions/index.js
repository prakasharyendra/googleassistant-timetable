// Update it into firebase/functions/index.js

process.env.DEBUG = 'actions-on-google:*';

const Assistant = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// API.AI Intent names

exports.assistantcodelab = functions.https.onRequest((request, response) => {
    console.log('headers: ' + JSON.stringify(request.headers));
    console.log('body: ' + JSON.stringify(request.body));

//Sunday = 0
var data_ver = 1.0;
var last_updated = 1504544001;

const subjects = [
					["BCSE1001","Introduction to Computer Science Engineering"],
					["BCSE1002","Computer Programming and Problem Solving"],
					["BTME1002","Product Design using Graphics"],
					["CHEM1001","Engineering Chemistry"],
					["CHEM1003","Engineering Chemistry Lab"],
					["FREN1001","French"],
					["MATH1001","Multivariable Calculus"],
					["MATH1002","Exploration with CAS"],
					["PHYS1001","Engineering Physics"],
					["PHYS1002","Engineering Physics Lab"],
					["SLBT1001","Soft Skills"],
					["UHVE1001","Universal Humal Values and Ethics"]
					];

const FREELECT = -1;
const BCSE1001 = 0;
const BCSE1002 = 1;
const BTME1002 = 2;
const CHEM1001 = 3;
const CHEM1003 = 4;
const FREN1001 = 5;
const MATH1001 = 6;
const MATH1002 = 7;
const PHYS1001 = 8;
const PHYS1002 = 9;
const SLBT1001 = 10;
const UHVE1001 = 11;

timetable = {};
timetable["sem1sec16"] = [[],[],[],[],[],0,0];
timetable["sem1sec16"][0] = [[CHEM1001,"A-010"],[MATH1001,"A-010"],[BCSE1001,"A-010"],[BCSE1001,"A-010"],[FREN1001,"A-125"],[FREN1001,"A-125"],[BCSE1002,"A-227"],[BCSE1002,"A-227"]];
timetable["sem1sec16"][1] = [[MATH1001,"A-010"],[CHEM1001,"A-010"],[FREELECT,"X-000"],[CHEM1001,"A-010"],[CHEM1003,"A-107"],[CHEM1003,"A-107"],[FREELECT,"X-000"],[FREELECT,"X-000"]];
timetable["sem1sec16"][2] = [[UHVE1001,"A-010"],[PHYS1001,"A-010"],[FREELECT,"X-000"],[MATH1001,"A-010"],[BCSE1002,"B-108"],[BCSE1002,"B-108"],[SLBT1001,"A-205"],[SLBT1001,"A-205"]];
timetable["sem1sec16"][3] = [[FREELECT,"X-000"],[UHVE1001,"A-010"],[PHYS1001,"A-010"],[BTME1002,"A-010"],[FREELECT,"X-000"],[FREELECT,"X-000"],[FREELECT,"X-000"],[FREELECT,"X-000"]];
timetable["sem1sec16"][4] = [[UHVE1001,"A-010"],[PHYS1001,"A-010"],[MATH1002,"A-010"],[MATH1002,"A-010"],[BTME1002,"B-105"],[BTME1002,"B-105"],[PHYS1002,"A-106"],[PHYS1002,"A-106"]];

numbs = ["first","second","third","fourth","fifth","sixth","seventh"];


food = [[],[],[],[],[],[],[]];
food[0] = [["Pav","Bhaji","Tea"],["Aloo Matar","Urad Chana"],["Bhelpuri","Sauce","Tea"],["Veg Kofta","Black Chana","Rice","Roti"]];
food[1] = [["Idli","Sambhar","Milk","Seasonal Fruit"],["Dum Aloo Punjabi","Rajma Masala","Rice","Chapati"],["Veg Noodles","Tea"],["Aloo Cabbage Matar","Black Masoor","Rice","Roti"]];
food[2] = [["Poori","Channa","Tea"],["Mix Vegetable","Dal Tadka","Rice","Chapati"],["Fried Rice","Tea"],["Aloo Soya Badi","Arhar dal tadka","Rice","Chapati","Fruit Salad"]];
food[3] = [["Matar Kulcha","Tea","Milk","Seasonal Fruit"],["Biryani","Raita","Mirchi Salan"],["Veg Pakora","Tea","Green Chutney"],["Aloo Matar","Chole","Rice","Roti"]];
food[4] = [["Wada","Sambhar","Tea"],["Paneer Shahi","Dal Punjabi","Rice","Roti","Payassam"],["Poha","Tea"],["Dhania Aloo","Rajma","Rice","Roti"]];
food[5] = [["Poori","Aloo Matar","Tea","Milk","Seasonal Fruit"],["Aloo Jeera","Kadi Pakoda","Rice","Roti"],["Break Pakoda","Tea","Green Chutney"],["Aloo Parmal Masala","Channa","Rice","Roti"]];
food[6] = [["Paratha","Matra","Pickle","Tea"],["Aloo Tamatar Matar","Dal Tadka","Rice","Roti"],["Mix Veg Pakoda","Tea","Green Chutney"],["Mix Veg","Dal Makhani","Rice","Roti","Halwa"]];


    const assistant = new Assistant({
        request: request,
            response: response
    });

    let actionMap = new Map();
    actionMap.set("lecwhich", lecwhich);
    actionMap.set("foodtimer", foodtimer);
    assistant.handleRequest(actionMap);



    function foodtimer(assistant) {
    	var dat = assistant.getArgument('date');
    	var foodtime = assistant.getArgument('foodtime');

        var day = "";
        if(dat == "today")
        {
        	var now = new Date();
        	day = now.getDate();
        }
        else
        {
        	var now = new Date(dat);
        	day = now.getDay();
        }
        var f = 3;
        if(foodtime == "lunch")
        {
        	f = 1;
        }
        else if(foodtime == "breakfast")
        {
        	f = 0;
        }
        else if(foodtime == "brunch")
        {
        	f = 2;
        }
        var fooresult = "";
        var len = food[day][f].length;
        for (var i = 0; i < len; i++) {
        	if(i == len-1)
        	{
        		fooresult += " and ";
        	}
        	else if(i != 0)
        	{
        		fooresult += ", ";
        	}

        	fooresult += food[day][f][i];
        }
        assistant.ask(fooresult);
    }




    function lecwhich(assistant) {
        var dat = assistant.getArgument('date');
        var lec = assistant.getArgument('lectures');
        var l = parseInt(lec);

        
        var day = "";
        if(dat == "today")
        {
        	var now = new Date();
        	day = now.getDate();
        }
        else
        {
        	var now = new Date(dat);
        	day = now.getDay();
        }
        if(!(timetable["sem1sec16"][day].constructor === Array))
        {
        	        		var simpleResponse = {
                speech: "You have a day off honey",
                displayText: "You have a day of honey 😏"
            };
                        var richResponse = assistant.buildRichResponse();
            richResponse.addSimpleResponse(simpleResponse);
            assistant.ask(richResponse);
        }
        else if(timetable["sem1sec16"][day][l][0] == FREELECT)
        {
        	        		var simpleResponse = {
                speech: "It is a free lecture!",
                displayText: "It is a free lecture 😏"
            };
                        var richResponse = assistant.buildRichResponse();
            richResponse.addSimpleResponse(simpleResponse);
            assistant.ask(richResponse);

        }
        else if(l != 3 && l != 7 && timetable["sem1sec16"][day][l][0] == timetable["sem1sec16"][day][l+1][0] )
        {
        		var simpleResponse = {
                speech: "The "+numbs[l] + " and "+ numbs[l+1] + " lectures are of " + subjects[timetable["sem1sec16"][day][l][0]][1],
                displayText: "The "+numbs[l] + " and "+ numbs[l+1] + " lectures are of " + subjects[timetable["sem1sec16"][day][l][0]][1] + " in Room "+subjects[timetable["sem1sec16"][day][l][0]][1]
            };
                        var richResponse = assistant.buildRichResponse();
            richResponse.addSimpleResponse(simpleResponse);
            assistant.ask(richResponse);


        	
        }
        else
        {
        	assistant.ask("It is "+ subjects[timetable["sem1sec16"][day][l][0]][1] + " in room " + timetable["sem1sec16"][day][l][1]);

        }


    }

});
