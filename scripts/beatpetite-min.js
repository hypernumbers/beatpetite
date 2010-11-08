// Setup
var numberOfSteps = 16;
var numberOfTracks = 8;
var tempoMilli = 125;
var runnerPos = 0;
var stepOnColour = "#f3cf63";
var stepOffColour = "#a4a2c4";
var runnerColour = "#fff";
var isPlaying = true;
var whatSample = new Array(numberOfTracks);

// Create sequencer and array for each instrument.
var sequencer = new Array(numberOfTracks);

for (var i=0; i<numberOfTracks; i++) {
    sequencer[i] = new Array(numberOfSteps);
    whatSample[i] = 0;
}

// Create UI
var paper = Raphael(($(document).width()/2)-400, 100, 800, 450);

// Draw sequencer
var chassis = paper.rect(74, 105, 650, 340, 5);
chassis.attr("fill", "#27363d");
chassis.attr("stroke-width","0");
chassis.attr("stroke-opacity",0)

var bar1 = paper.rect(79,110,160,330);
bar1.attr("fill","#2e4c5a");
bar1.attr("stroke-width","0");
bar1.attr("stroke-opacity",0)

var bar2 = paper.rect(240,110,159,330);
bar2.attr("fill","#273e49");
bar2.attr("stroke-width","0");
bar2.attr("stroke-opacity",0)

var bar3 = paper.rect(400,110,159,330);
bar3.attr("fill","#2e4c5a");
bar3.attr("stroke-width","0");
bar3.attr("stroke-opacity",0)

var bar4 = paper.rect(560,110,159,330);
bar4.attr("fill","#273e49");
bar4.attr("stroke-width","0");
bar4.attr("stroke-opacity",0)

var volUp = paper.path("M710 64 L700 74 L720 74 L710 64 z");
volUp.attr("stroke-width", "0");
volUp.attr("fill", "#f3cf63");
volUp.attr("stroke-opacity",0)
volUp.node.setAttribute("class", "vol-button");

volUp.click(function(){
    $("#bpm").text((parseInt($("#bpm").text())+1));
    changeBpm($("#bpm").text());
});

var volDown = paper.path("M710 88 L700 78 L720 78 L710 88 z");
volDown.attr("stroke-width", "0");
volDown.attr("fill", "#f3cf63");
volDown.attr("stroke-opacity",0)
volDown.node.setAttribute("class", "vol-button");
volDown.click(function(){
    $("#bpm").text((parseInt($("#bpm").text())-1));
    changeBpm($("#bpm").text());
});

for (var i=0; i<numberOfTracks; i++) {
    for (var j=0; j<numberOfSteps;j++) {
        sequencer[i][j] = paper.circle(j*40+100, i*40+135, 10);
        sequencer[i][j].attr("fill", stepOffColour);
        sequencer[i][j].attr("stroke-width", 0);
        sequencer[i][j].attr("stroke-opacity",0)
        sequencer[i][j].node.setAttribute("class", "beat-circle");
    }
}

(function startSequencer() {
    setTimeout(function() {
        if (isPlaying) {
            for (var i = 0; i < numberOfTracks; i++) {
                 sequencer[i][runnerPos].attr("fill", runnerColour);

                     if (runnerPos == 0) {
                         if (sequencer[i][numberOfSteps-1].node.getAttribute("value") == "true") {
                             sequencer[i][numberOfSteps-1].attr("fill", stepOnColour);
                         } else {
                             sequencer[i][numberOfSteps-1].attr("fill", stepOffColour);
                         }
                     } else {
                         if (sequencer[i][runnerPos-1].node.getAttribute("value") == "true") {
                             sequencer[i][runnerPos-1].attr("fill", stepOnColour);
                         } else {
                             sequencer[i][runnerPos-1].attr("fill", stepOffColour);
                         }
                     }

                     if (sequencer[i][runnerPos].node.getAttribute("value") == "true") {
                         sequencer[i][runnerPos].attr("fill", runnerColour);
                         playAudio(i);
                     }
             }

             runnerPos ++;

             if (runnerPos == numberOfSteps) {
                 runnerPos = 0;
             }
         }
    startSequencer();
    },
    tempoMilli);}
)();

function playAudio(drumNum) {
    document.getElementById("drumtype-" + drumNum + "-" + whatSample[drumNum]).currentTime = 0;
    document.getElementById("drumtype-" + drumNum + "-" + whatSample[drumNum]).play();

    whatSample[drumNum]++;
    if (whatSample[drumNum] == 4) {
        whatSample[drumNum] = 0;
    }
}  

$(".beat-circle").click(function () {
    if ($(this).attr("value") == "true") {
        $(this).attr("fill", stepOffColour);
        $(this).attr("value", "false");
    } else {
        $(this).attr("fill", stepOnColour);
        $(this).attr("value", "true");
    }
});

function changeBpm(bpm) {
    $("#milli").text((60000/bpm)/4);
    tempoMilli = (60000/bpm)/4;
}

$("#stop").click(function(){
    isPlaying = false;
});

$("#start").click(function(){
    isPlaying = true;
});

function load808(){
    for (var i=0; i<4; i++) {
        $("#drumtype-0-" + i).attr("src","samples/808/kick.ogg");
        $("#drumtype-1-" + i).attr("src","samples/808/snare.ogg");
        $("#drumtype-2-" + i).attr("src","samples/808/chh.ogg");
        $("#drumtype-3-" + i).attr("src","samples/808/clave.ogg");
        $("#drumtype-4-" + i).attr("src","samples/808/rim.ogg");
        $("#drumtype-5-" + i).attr("src","samples/808/cymbal.ogg");
        $("#drumtype-6-" + i).attr("src","samples/808/clap.ogg");
        $("#drumtype-7-" + i).attr("src","samples/808/cow.ogg");   
    }
}

function load909() {
    for (var i=0; i<4; i++) {
        $("#drumtype-0-" + i).attr("src","samples/909/kick.ogg");
        $("#drumtype-1-" + i).attr("src","samples/909/snare.ogg");
        $("#drumtype-2-" + i).attr("src","samples/909/chh.ogg");
        $("#drumtype-3-" + i).attr("src","samples/909/ohh.ogg");
        $("#drumtype-4-" + i).attr("src","samples/909/tomh.ogg");
        $("#drumtype-5-" + i).attr("src","samples/909/rim.ogg");
        $("#drumtype-6-" + i).attr("src","samples/909/ride.ogg");
        $("#drumtype-7-" + i).attr("src","samples/909/clap.ogg");
    }
}

function loadLinndrum() {
    for (var i=0; i<4; i++) {
        $("#drumtype-0-" + i).attr("src","samples/linndrum/kick.ogg");
        $("#drumtype-1-" + i).attr("src","samples/linndrum/snare.ogg");
        $("#drumtype-2-" + i).attr("src","samples/linndrum/chh.ogg");
        $("#drumtype-3-" + i).attr("src","samples/linndrum/ohh.ogg");
        $("#drumtype-4-" + i).attr("src","samples/linndrum/tomh.ogg");
        $("#drumtype-5-" + i).attr("src","samples/linndrum/toml.ogg");
        $("#drumtype-6-" + i).attr("src","samples/linndrum/ride.ogg");
        $("#drumtype-7-" + i).attr("src","samples/linndrum/cow.ogg");
    }
}

function loadSamples(kit) {
    if (kit == "808") {
        load808();
    } else if (kit == "909") {
        load909();
    } else if (kit == "linndrum"){
        loadLinndrum();
    }
}

$("#drum-select li").click(function(){
    $("#drum-select li").each(function(){
        $(this).attr("id","");
    });
    loadSamples($(this).attr("title"));
    $(this).attr("id","selected");
});