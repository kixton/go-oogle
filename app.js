
$(document).ready(function() {
  var fb = new Firebase("https://gooogle.firebaseio.com/");

  // seed data
  fb.child("men").set({
    101: {
      name: "Brad",
      age: 32,
      imgUrl: "http://fandomobsessed.com/wp-content/uploads/2014/01/bradpitt1.jpg",
      match: true
    },
    102: {
      name: "Paul",
      age: 29,
      imgUrl: "http://media.melty.es/article-2524830-ajust_930-f1385885461/paul-walker-fallece-a-los-40-anos-en-un-accidente.jpg",
      match: true
    },
    103: {
      name: "Channing",
      age: 28,
      imgUrl: "http://thehollywoodbillboard.com/wp-content/uploads/2014/09/Channing-tatum-1.jpg",
      match: false
    },
    104: {
      name: "Wentworth",
      age: 25,
      imgUrl: "http://assets-s3.usmagazine.com/uploads/assets/articles/65715-wentworth-miller-comes-out-as-gay-refuses-invitation-to-russian-film-festival/1377123456_wentworth-miller-zoom.jpg",
      match: true
    },
    105: {
      name: "Justin",
      age: 18,
      imgUrl: "http://assets-s3.usmagazine.com/uploads/assets/articles/61491-justin-bieber-strikes-back-im-young-and-i-make-mistakes/1364414455_justin-bieber-lg.jpg",
      match: false
    },
    106: {
      name: "George",
      age: 55,
      imgUrl: "http://images.kdramastars.com/data/images/full/61970/george-clooney-2014.jpg",
      match: true
    },
    107: {
      name: "David",
      age: 26,
      imgUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRXgL1bSwN6R0uThnw5SJCSmyZT65LYphrkin-T_4u8G_w_r21DWw",
      match: false
    },
    108: {
      name: "Elvis",
      age: 33,
      imgUrl: "http://images.fineartamerica.com/images-medium-large/elvis-presley-ca-1950s-everett.jpg",
      match: true
    },
    109: {
      name: "Ashton",
      age: 30,
      imgUrl: "http://www.celebritlove.net/wp-content/uploads/2014/09/ashton-kutcher-2.jpg",
      match: true
    },
    110: {
      name: "Albert",
      age: 99,
      imgUrl: "http://pixweluv.com/files/funzug/imgs/misc/albert_einstein_rare_07.jpg",
      match: true
    },
    111: {
      name: "Leonardo",
      age: 29,
      imgUrl: "http://www.hollywoodreporter.com/sites/default/files/imagecache/news_portrait/2014/10/Leonardo_DiCaprio.jpg",
      match: true
    }
  });

  fb.child("women").set({
    201: {
      name: "Angelina",
      age: 28,
      imgUrl: "http://glamceo.com/wp-content/uploads/2014/09/140633858-jpg_172008.jpg",
      match: true
    },
    202: {
      name: "Miley",
      age: 18,
      imgUrl: "http://media.zenfs.com/289/2011/08/02/MileyCyrus_071025.jpg",
      match: false
    },
    203: {
      name: "Scarlett",
      age: 25,
      imgUrl: "http://imageserver.moviepilot.com/morph_johansson_alba-scarlett-johansson-jessica-alba-face-merge-perfection.jpeg",
      match: false
    },
    204: {
      name: "Charlize",
      age: 27,
      imgUrl: "http://media1.onsugar.com/files/2012/12/51/3/192/1922398/94e9577e422a2537_charlize.xxxlarge_2/i/Charlize-Theron.jpg",
      match: true
    },
    205: {
      name: "Jamie",
      age: 24,
      imgUrl: "http://dr2myn8hjue41.cloudfront.net/wp-content/uploads/2014/07/Jamie-Chung.jpg",
      match: true
    },
    206: {
      name: "Beyonce",
      age: 29,
      imgUrl: "http://www.hellomagazine.com/imagenes//celebrities/2013060412903/Beyonce-dispels-baby-rumours/0-66-222/Beyonce--z.jpg",
      match: true
    },
    207: {
      name: "Madonna",
      age: 55,
      imgUrl: "http://assets-s3.usmagazine.com/uploads/assets/photo_galleries/regular_galleries/2500-hollywoods-most-powerful-women-of-2014/photos/1401992230_madonna-560.jpg",
      match: true
    },
    208: {
      name: "Kim",
      age: 27,
      imgUrl: "http://iadorebeauty.com/wp-content/uploads/2014/09/Kim-Kardashian-Nipples-4kimkardashiantackledbyfan.jpg",
      match: false
    },
    209: {
      name: "Jennifer",
      age: 31,
      imgUrl: "http://img2.timeinc.net/instyle/images/2012/GALLERY/091812-Jennifer-Aniston-400.jpg",
      match: true
    },
    210: {
      name: "Tyra",
      age: 33,
      imgUrl: "http://img1.wikia.nocookie.net/__cb20131114002114/glee/images/7/76/Tyra-banks.jpg",
      match: false
    },
    211: {
      name: "Marilyn",
      age: 38,
      imgUrl: "http://hollywoodpsychicinsider.com/wp-content/uploads/2013/11/Marilyn-Monroe-Icon.jpg",
      match: true
    },
  });

  // define variables
  var genderPref = "";
  var defaultMinAge = 18;
  var defaultMaxAge = 30;
  var defaultGenderPref = "men";
  var meetsCriteria = [];
  var currentOogleInfo;
  var currentOogleId;

  // create random userid
  var randNum = Math.floor((Math.random() * 1000) + 1);
  var currentUserId = randNum;
  
  // Firebase references
  var voteRef = fb.child("users").child(currentUserId);
  var matchesRef = fb.child("users").child(currentUserId).child("matches");
  var meetsRef = fb.child("users").child(currentUserId).child("meets");
    
  // on click of gender preference
  $(".gender-pref").click(function() {
    $(".gender-pref").removeClass("gender-active");
    $(this).addClass("gender-active");
    genderPref = $(this).val();
    console.log("gender pref set: " + genderPref);
  });

  // handling user preferences (gender, min age, max age)
  $("#start").click(function() {    
    var minAge = $("#min-age").val();
    var maxAge = $("#max-age").val();

    // if no preferences specified, set to defaults
    if (minAge === "") {
      minAge = defaultMinAge;
    } 
    if (maxAge === "") {
      maxAge = defaultMaxAge;
    }
    if (genderPref === "") {
      genderPref = defaultGenderPref;
    }

    // store user preferences
    fb.child("users").child(currentUserId).set(
      {preferences: {
        gender: genderPref,
        minAge: minAge,
        maxAge: maxAge
      }
    });

    // oogles who meet user preferences
    fb.child(genderPref).once("value", function(data) {
      var meetsGenderPref = data.val();
      $.each(meetsGenderPref, function(uid, userInfo) {
        if (userInfo.age >= minAge && userInfo.age <= maxAge) {
          meetsRef.child(uid).set(userInfo);
        }
      });
    });

    // show first oogle who meets preference
    meetsRef.once("value", function(data) {
      var object = data.val();
      currentOogleInfo = object[Object.keys(object)[0]];
      currentOogleId = Object.keys(object)[0];
      $(".oogle-img").css("background-image", "url(" + currentOogleInfo.imgUrl + ")");
      $(".oogle-name").html(currentOogleInfo.name);
      $(".oogle-age").html(currentOogleInfo.age);
    });

    // hide preferences, show oogles
    $(".welcome").hide();
    $(".preferences").hide();
    $(".nav").show();
    $(".oogle-container").show();
  });

  // on click of "vote" button
  $(".vote").click(function() {
    var vote = $(this).val();
    console.log(vote);

    voteRef.child(vote).child(currentOogleId).set(currentOogleInfo);
    var oogleInfo = fb.child(genderPref).child(currentOogleId);

    oogleInfo.once("value", function(data) {
      var oogle = data.val();

      if ( vote === "likes" && oogle.match === true) {
        console.log("yah, it's a match!");
        matchesRef.child(currentOogleId).set(oogle);
        var div = "<div class='match-img' style='background-image: url(" + oogle.imgUrl + ")'></div>";
        $(".all-matches").append(div);

      } else {
         console.log("sorry, no match");
      }
    });

    // remove oogle from user's meets criteria list
    meetsRef.child(currentOogleId).remove();

    meetsRef.once("value", function(data) {
      var object = data.val();

      if (object === null) {
        console.log("no more oogles");
        $(".no-more-oogles").show();
        $(".oogle-img").hide();
        $(".oogle-overview").hide();
        $(".vote").hide();
      } else {
        currentOogleInfo = object[Object.keys(object)[0]];
        currentOogleId = Object.keys(object)[0];
        $(".oogle-img").css("background-image", "url(" + currentOogleInfo.imgUrl + ")");
        $(".oogle-name").html(currentOogleInfo.name);
        $(".oogle-age").html(currentOogleInfo.age);
      }
    });
  });

  $("#match").click(function() {
    $("#oogle").removeClass("active-link");
    $(this).addClass("active-link");

    matchesRef.once("value", function(data) {
      var matches = data.val();
      console.log(matches);
      if (matches === null) {
        $(".no-matches").show();
      } else {
        $(".no-matches").hide();
      }

    });

    $(".oogle-container").hide();
    $(".oogle-matches").show();

  });

  $("#oogle").click(function() {
    $("#match").removeClass("active-link");
    $(this).addClass("active-link");

    $(".oogle-matches").hide();
    $(".oogle-container").show();
  });


});

