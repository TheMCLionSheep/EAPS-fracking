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
    if (!door.classList.contains('open')) {
        door.classList.toggle('open');
        toggleKnocks();

        // Create a new dialogue element
        setTimeout(guestResponse, 800);
    }
});

const respondButton = document.getElementById('respond-button');

const guestDialogues = [
    "Hey! Do you have any idea how much damage you've caused?",
    "Did you not realize the impact that all of your hydraulic fracking would have on the water here? Your wells consume millions of gallons of water from our sources of water! Now the public here is sturggling to find water.",
    "More water?! Get a load of this kid! Not if you keep pollluting it too! All the flowback water coming from your wells is contaminated with heavy metals, radioactive elements, and toxic chemicals! This water pollution is contimating our groundwater and affecting our ecosystem!",
    "Why don't you see for yourself? Run this water test to see what you've done to the water here!",
    
    "I'm one of your geologists, and something is not right! Your fracking is causing too much damage",
    "Well when you inject all the wasteater your site produces into the rock, you're raising the pressure levels in the rock formations. All of these seem small now, but there seem to be a lot of them - creating the potential for a very large and damaging earthquake right near all of these houses!",
    "Yes it can, here let me show you.",

    "You've destroyed our rural roads",
    "All of those trucks? There yours ain't they? Well, let me tell you, they are HEAVY! And there's just so many of them and the mere size of them is terrifying! Our roads weren't built for this. They can't carry all of these vehicles all willy-nilly like this."
];

const userDialogues = [
  "Who are you? Damage? What are you talking about?",
  "But there's more water?? is there not?",
  "I don't believe you",
  "Ugh, okay get out, I'll do something about it? Bye now.",

  "Okay what do you mean?",
  "What? How does that even work? Fracking can't lead to earthquakes?!",
  "Ugh, okay bye. I'll figure something out. Bye now.",

  "What? Who are you?? How can I destroy whole roads???",
  "Ugh, okay, I guess I'll deal with it? Bye now."
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

