const door = document.getElementById('door-image');
const person = document.getElementById('person');
const personImage = document.getElementById("person-image");
const dialogueColumn = document.getElementById('dialogue-column');
const windowImage = document.getElementById('window-image');
const continueButton = document.getElementById('continue-button');

var kickoutGuestCount = 0;

var interval;

const TEXT_SPEED = 30;
const ANIMATION_SPEED = 500;

door.addEventListener('click', function() {
    if (door.classList.contains('done')) {
        return;
    }
    if (!door.classList.contains('open')) {
        door.classList.toggle('open');
        toggleKnocks();

        // Create a new dialogue element
        setTimeout(guestResponse, 800);
    }
});

const respondButton = document.getElementById('respond-button');

const guestDialogues = [
    "Hey there! Ever stop to think about the havoc you're wreaking?",
    "You don't realize the ripple effect of your fracking frenzy, do you? Those wells of yours are guzzling down millions of gallons from our already strained water sources! Now folks around here are parched, thanks to you.",
    "Enough water? Listen to this rookie! Not if you keep turning it into a toxic cocktail! All that flowback water seeping into the ground is laced with heavy metals, radioactivity, and all manner of nasties! It's poisoning our aquifers and messing with the entire ecosystem!",
    "See for yourself! Take this water sample and witness the mess you've made!",
    
    "Listen up, I'm no doomsayer, but something's amiss! Your fracking frenzy is setting off alarm bells.",
    "Well when you inject all the wastewater your site produces into the rock, you're raising the pressure levels in the rock formations. Those little tremors might not seem like much now, but they're adding up. And if we're not careful, we could be looking at a major quake right in our backyard!",
    "Oh it's no stretch. Here let me show you.",

    "You've torn up our country roads.",
    "Them trucks of yours? They're beasts! And there's a whole convoy of 'em, rumbling through our quiet lanes day in, day out. Our roads ain't built for that kind of punishment, I tell ya.",
    "You better, else there won't be much road left to catch anyone on!"
];

const userDialogues = [
  "And who might you be? Havoc? What on earth are you on about?",
  "But surely there's enough water to go around, right?",
  "You can't be serious.",
  "Fine, leave it with me. I'll see what I can do. Goodbye.",

  "Alright, spill it. What's got you rattled?",
  "Hold on, fracking causing earthquakes? That's a stretch!",
  "Okay, okay, I'll look into it. Thanks. Goodbye.",

  "Whoa, slow down. Who are you, and how exactly am I tearing up roads?",
  "Alright, alright, I get it. I'll see what I can do. Catch you later.",
  "I get it!"
];

const interactiveSpots = {4: ["water", new URL("/raw-assets/images{m}{tps}/scientist.png", import.meta.url).href], 7: ["earthquake", new URL("/raw-assets/images{m}{tps}/farmer.png", import.meta.url).href], 9: ["roads", new URL("/raw-assets/images{m}{tps}/farmer.png", import.meta.url).href]}
var dialogueIndex = 0;
var slideshowImages = []; // initialize slideshow

respondButton.addEventListener('click', function() {
    if (respondButton.classList.contains('unactive')) {
        return;
    }
    const newDialogueText = userDialogues[dialogueIndex++];
    displayNextDialogue(newDialogueText);

    if (dialogueIndex in interactiveSpots) {
        // Onto next person, close the door
        // Clear the previous slideshow images
        
        setTimeout(kickoutGuest, newDialogueText.length * TEXT_SPEED + 1000);
    } else {
        setTimeout(guestResponse, newDialogueText.length * TEXT_SPEED + 1000);
    }

});

continueButton.addEventListener('click', function() {
    if (continueButton.classList.contains('unactive')) {
        return;
    }
});

function startSlideshow() {

    slideshowImages = [];

    // Get the current interactive spot
    const spot = interactiveSpots[dialogueIndex+1][0];

    // Push all images related to this spot into the slideshowImages array
    switch (spot) {
        case "water":
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\watertest1.png", import.meta.url).href);
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\watertest.png", import.meta.url).href); // Image URL for water
            // Push more images if needed
            break;
        case "earthquake":
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\earthquake1.png", import.meta.url).href);
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\earthquake2.png", import.meta.url).href);
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\earthquake3.png", import.meta.url).href); // Image URL for earthquake
            // Push more images if needed
            break;
        case "roads":
            console.log("error at roads");
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\before_road.jpg", import.meta.url).href);
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\after_road.jpg", import.meta.url).href);
            slideshowImages.push(new URL("/raw-assets\images{m}{tps}\after_road2.jpg", import.meta.url).href); // Image URL for roads
            // Push more images if needed
        
            break;
            

        // Add more cases if needed for additional interactive spots
    }
    let index = 0;
    windowImage.src = slideshowImages[index];
        index++;

        // Reset index if it exceeds the length of the slideshowImages array
        if (index >= slideshowImages.length) {
            index = 0;
        }
    interval = setInterval(() => {
        // Set the image source to the current image in the slideshowImages array
        windowImage.src = slideshowImages[index];
        index++;

        // Reset index if it exceeds the length of the slideshowImages array
        if (index >= slideshowImages.length) {
            index = 0;
        }
    }, 3000); // Change image every 3 seconds

    // Stop the slideshow after 15 seconds
    


}

function guestResponse() {
    displayNextDialogue(guestDialogues[dialogueIndex], false)
    //check if dialouge index is right before last one
    if (dialogueIndex+1 in interactiveSpots) {
        startSlideshow();
    }


}

function kickoutGuest() {
    door.classList.toggle('open');
    removePreviousDialogue();
    setTimeout(() => {
        personImage.src = interactiveSpots[dialogueIndex][1];
        toggleKnocks();
    }, ANIMATION_SPEED);

    clearInterval(interval);
    windowImage.src = (new URL("/raw-assets\images{m}{tps}\window.jpg", import.meta.url).href);

    if (dialogueIndex == 9) {
        continueButton.style.display = 'block';
        door.classList.add('done');
        toggleKnocks();
    }
}

function removePreviousDialogue() {
    // Remove the last dialogue from the column
    const previousDialogue = dialogueColumn.firstElementChild;
    if (previousDialogue) {
        previousDialogue.style.opacity = 0;
        previousDialogue.style.top = '-90%'; // Slide out
        setTimeout(() => {
        previousDialogue.remove();
        }, ANIMATION_SPEED); // Delay to ensure the animation completes before removal
    }
}

function displayNextDialogue(dialogueText, isUser = true) {
    removePreviousDialogue();

    // Create a new dialogue element
    const newDialogue = document.createElement('div');
    newDialogue.classList.add('dialogue');
    if (isUser) {
        newDialogue.classList.add('user-bubble');
        respondButton.classList.add("unactive");
    }
    else {
        setTimeout(() => {
            respondButton.classList.remove('unactive');
        }, ANIMATION_SPEED);
    }
    newDialogue.textContent = dialogueText;

    // Add the new dialogue to the column
    dialogueColumn.appendChild(newDialogue);

    // Animate the new dialogue to slide up and fade in
    setTimeout(() => {
        newDialogue.style.top = '10%'; // Slide up
        newDialogue.style.opacity = 1; // Fade in
    }, 10); // Delay to ensure the animation works properly
}

function toggleKnocks() {
    var knocks = document.querySelectorAll('.knock');
    knocks.forEach(function(knock) {
        knock.classList.toggle('active');
    });
}

