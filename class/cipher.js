/*	-WHAT IS THIS?-
	This file adds optional material to "MPMB's Character Record Sheet" found at https://flapkan.com/mpmb/charsheets
	Import this file using the "Add Extra Materials" bookmark.

	-KEEP IN MIND-
	It is recommended to enter the code in a fresh sheet before adding any other information (i.e. before making your character with it).
*/

/*  -INFORMATION-
	Subject:    Class
	Effect:     This script adds the class called "Cipher", which has no subclasses, and its unique spellcasting system

				This class has been made by Markarthian

				This class can be found here: https://homebrewery.naturalcrit.com/share/HJbgSSd63cN

				Please support the creators of this content by praying to the Shark God.

	Code by:	Shrooblord
	Date:		2020-04-04 (sheet v13.0.0beta23)

	As no multiclassing rules are given in the source, the ones here are an interpretation by Shrooblord.
*/
var iFileName = "cipher.js";
RequiredSheetVersion(13);

// The Cipher class (Markarthian; Terratus supplementary content)
SourceList["TER:001"] = {
	name : "Markarthian [Terratus 001] Cipher",
	abbreviation : "TER:001",
	group : "Markarthian",
	url : "https://homebrewery.naturalcrit.com/share/HJbgSSd63cN",
	date : "2017/08/01"
};

//first make the sheet know which spells are Cipher Talents
[
	"mind wave",
].forEach( function (s) {
	if(SpellsList[s] && SpellsList[s].classes && SpellsList[s].classes.indexOf("cipher") === -1) SpellsList[s].classes.push("cipher");
});

// Create the Cipher class
ClassList["cipher"] = {
	regExpSearch : /^(?=.*cipher).*$/i,
	name : "Cipher",
	source : ["TER:001", 1],
	primaryAbility : "\n \u2022 Cipher: Intelligence;",
	abilitySave : 4,
	prereqs : "\n \u2022 Cipher: Intelligence 13;",
	improvements : [0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5],
	die : 8,
	saves : ["Dex", "Int"],
	skills : ["\n\n" + toUni("Cipher") + ": Choose two from Acrobatics, Arcana, Insight, Perception, Religion, and Stealth."],
	armor : [
		[true, true, false, true]
    ],
    
    //<<        SHROOB: YOU'RE HERE         >>

	weapons : [
		[false, false, ["dagger", "dart", "light crossbow", "quarterstaff", "sling"]]
	],
	equipment : "Cardcaster starting equipment:\n \u2022 A quarterstaff, -or- a dagger, -or-  a longsword (if proficient);\n \u2022 A component pouch, -or- an arcane focus, -or- a holy symbol;\n \u2022 A scholar's pack -or- a priest's pack;\n \u2022 Leather armor;\n \u2022 A set of tarot cards.\n\nAlternatively, choose 4d4 \xD7 10 gp worth of starting equipment instead of both the class' and the background's starting equipment.",
	subclasses : ["Focus Card", []],
	attacks : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	spellcastingFactor : "cardcaster0",
	spellcastingKnown : {
		spells : "list"
	},
	features : {
		"cards of power" : {
			name : "Cards of Power",
			source : ["EN5:106", 2],
			minlevel : 1,
			description : desc([
				"I can cast spells with my deck of tarot cards, using Intelligence as my spellcasting ability",
				"I can use an arcane focus, holy symbol, or tarot card as spellcasting focus"
			]),
			additional : levels.map(function(n) {
				var majorArcana = n < 3 ? 'V' : n < 5 ? 'VII' : n < 7 ? 'IX' : n < 9 ? 'XI' : n < 11 ? 'XIII' : n < 13 ? 'XV' : n < 15 ? 'XVII' : n < 17 ? 'XIX' : 'XXI';
				var handSize = n < 3 ? 2 : n < 6 ? 3 : n < 11 ? 4 : n < 15 ? 5 : n < 19 ? 6 : 7;
				return "deck: cards 0-" + majorArcana + "; full hand: " + handSize + " cards";
			}),
			extraname : "Cardcaster 1",
			"card magic" : {
				name : "Card Magic",
				source : ["EN5:106", 2],
				description : desc([
					"I have a special deck of tarot cards with each card containing a number of spells",
					"See the 'Notes' page for a listing of all the cards and the spells they contain",
					"I can play a card from my hand, casting one of the spells of my choice from the card",
					"Playing a card takes the same amount of time as casting the chosen spell would take",
					"I have to provide components as normal; Once I play a card, it is moved to the discard pile",
					"At the end of my turn, when I have less than a full hand, I draw cards until my hand is full",
					"After a long rest, I can discard any cards in my hand and draw new ones up to a full hand",
					"Before drawing new cards like this, I first have to shuffle the discard pile and deck together",
					"The cards in my deck, the size of a full hand, and the amount of plays depend on my level",
					"Some cards have restrictions on playing them after another card",
					"I can discard restricted cards at any time and then draw a replacement card"
				])
			},
			"ritual casting" : {
				name : "Ritual Casting",
				source : ["EN5:106", 3],
				minlevel : 1,
				description : desc([
					"I can cast spells on the cards in my hand as rituals if they have the ritual tag",
					"Doing so doesn't count as playing the card and I don't have to discard the card",
					"In addition, I can memorize any divination spells with the ritual tag I come across",
					"Memorizing a spell takes 2 hours and 50 gp per level of the spell",
					"Once memorized, I can cast the divination ritual spell as a ritual at any time"
				])
			},
			eval : "if (CurrentSpells.cardcaster) { CurrentSpells.cardcaster.typeList = 2; }; ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra']); try { ClassList.cardcaster.addMajorArcana(); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra']); CurrentSpells['cardcaster-divination rituals'] = {name : 'Divination Rituals', ability : 4, list : {school : ['Div'], ritual : true}, known : {spells : 'book'}}; SetStringifieds('spells');", // Select the 'All spells known regardless of level' checkbox by default
			removeeval : "ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra'], 'remove'); try { ClassList.cardcaster.removeMajorArcana(); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra'], 'remove'); delete CurrentSpells['cardcaster-divination rituals']; SetStringifieds('spells');"
			//eval : "if (CurrentSpells.cardcaster) { CurrentSpells.cardcaster.typeList = 2; }; ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra']); try { AddToNotes(ClassList.cardcaster.features['cards of power'].majorArcana1, 'Major Arcana cards 0-XI of the Cardcaster class'); AddToNotes(ClassList.cardcaster.features['cards of power'].majorArcana2, 'Major Arcana cards XII-XXI of the Cardcaster class'); } catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra']); CurrentSpells['cardcaster-divination rituals'] = {name : 'Divination Rituals', ability : 4, list : {school : ['Div'], ritual : true}, known : {spells : 'book'}}; SetStringifieds('spells');", // Select the 'All spells known regardless of level' checkbox by default
			//removeeval : "ClassFeatureOptions(['cardcaster', 'cards of power', 'card magic', 'extra'], 'remove'); try {AddToNotes('', '', ClassList.cardcaster.features['cards of power'].majorArcana1); AddToNotes('', '', ClassList.cardcaster.features['cards of power'].majorArcana2);} catch (er) {}; ClassFeatureOptions(['cardcaster', 'cards of power', 'ritual casting', 'extra'], 'remove'); delete CurrentSpells['cardcaster-divination rituals']; SetStringifieds('spells');"
		},
		"major arcana plays" : {
			name : "Major Arcana Plays",
			source : ["EN5:106", 2],
			minlevel : 1,
			description : desc([
				"I can play a card from my hand only a limited number of times per long rest"
			]),
			usages : levels.map(function(n) {
				return n < 2 ? 2 : n < 3 ? 3 : n < 4 ? 4 : n < 6 ? 5 : n < 7 ? 6 : n < 10 ? 7 : 8;
			}),
			recovery : "long rest"
		},
		"subclassfeature1" : {
			name : "Focus Card",
			source : ["EN5:106", 4],
			minlevel : 1,
			description : desc([
				"Choose your Focus Card of the minor arcana and put it in the \"Class\" field",
				"Choose either the Knight of Swords, Page of Wands, or Queen of Cups"
			])
		},
		"arcana surge" : {
			name : "Arcana Surge",
			source : ["EN5:106", 4],
			minlevel : 3,
			description : desc([
				"Spells I cast through tarot cards count as being cast with a higher level spell slot"
			]),
			additional : levels.map(function(n) {
				return n < 3 ? "" : (n < 5 ? '2nd' : n < 7 ? '3rd' : n < 9 ? '4th' : '5th') + "-level spell slot";
			})
		},
		"mulligan" : {
			name : "Mulligan",
			source : ["EN5:106", 4],
			minlevel : 11,
			description : desc([
				"Once per day after finishing a short rest, I can discard as many cards as I want",
				"I then draw new cards again until I have a full hand"
			]),
			usages : 1,
			recovery : "long rest"
		},
		"card mastery" : {
			name : "Card Mastery",
			source : ["EN5:106", 4],
			minlevel : 18,
			description : desc([
				"By spending 8 hours in contemplation, I can select one major arcana card from 0-V",
				"The selected card is always in my hand and doesn't count towards a full hand",
				"I can play the card as often as I like without expending a Major Arcana Play"
			])
		},
		"signature card" : {
			name : "Signature Card",
			source : ["EN5:106", 4],
			minlevel : 20,
			description : desc([
				'Choose a Signature Card using the "Choose Feature" button above',
				"The selected card is always in my hand and doesn't count towards a full hand",
				"I can play this card twice per short rest without expending a Major Arcana Play",
				"However, doing so doesn't benefit from Arcana Surge"
			]),
			usages : 2,
			recovery : "short rest",
			choices : ["VI - The Lovers", "VII - The Chariot", "VIII - Justice", "IX - The Hermit"],
			"vi - the lovers" : {
				name : "Signature Card: The Lovers",
				description : desc([
					"The Lovers card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"vii - the chariot" : {
				name : "Signature Card: The Chariot",
				description : desc([
					"The Chariot card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"viii - justice" : {
				name : "Signature Card: Justice",
				description : desc([
					"The card Justice is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			},
			"ix - the hermit" : {
				name : "Signature Card: The Hermit",
				description : desc([
					"The Hermit card is always in my hand and doesn't count towards a full hand",
					"I can play this card twice per short rest without expending a Major Arcana Play",
					"However, doing so doesn't benefit from Arcana Surge"
				])
			}
		}
	}
};
