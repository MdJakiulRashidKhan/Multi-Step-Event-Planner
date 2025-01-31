$(document).ready(function () {
  let currentStep = 0;
  const steps = $(".step");
  const progressBar = $("#progressBar");
  const stepIndicators = $(".step-indicator");

  function updateStep() {
    steps.removeClass("active").eq(currentStep).addClass("active");
    stepIndicators
      .removeClass("bg-primary")
      .addClass("bg-secondary")
      .eq(currentStep)
      .removeClass("bg-secondary")
      .addClass("bg-primary");
    progressBar.css("width", ((currentStep + 1) / steps.length) * 100 + "%");
  }

  $(".next-btn").click(function () {
    let isValid = true;
    $(steps[currentStep])
      .find(".required")
      .each(function () {
        if (!$(this).val()) {
          isValid = false;
          $(this).addClass("is-invalid");
        } else {
          $(this).removeClass("is-invalid");
        }
      });

    // Password confirmation validation
    if (currentStep === 0 && $("#password-2").val() !== $("#confirm-2").val()) {
      isValid = false;
      toastr.error("Passwords do not match!");
    }

    if (isValid) {
      currentStep++;
      updateStep();
    } else {
      toastr.error("Please fill in all the required fields.");
    }
  });

  $(".prev-btn").click(function () {
    currentStep--;
    updateStep();
  });

  $("#eventForm").submit(function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Check if the Terms & Conditions checkbox is checked
    if ($("#terms").is(":checked")) {
      toastr.success("Form Submitted Successfully!");
      // Optionally, you can add AJAX here to send form data to the server
    } else {
      toastr.error("Please agree to the Terms & Conditions before submitting.");
    }
  });

  updateStep();

  // Initialize the jQuery UI datepicker
  $("#event_date").datepicker({
    dateFormat: "yy-mm-dd",
  });
});

// Initialize phone number input
var iti = window.intlTelInput(document.querySelector("#phone"), {
  initialCountry: "bd",
  onlyCountries: ["bd"],
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.8/build/js/utils.js",
});

// Initialize TinyMCE
tinymce.init({
  selector: "#eventDescription", // Target the textarea element
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | help",
  menubar: false, // Hide the menubar for simplicity
  height: 300, // Set the height of the editor
  branding: false, // Remove TinyMCE branding
  setup: function (editor) {
    editor.on("change", function () {
      editor.save(); // Save the content back to the textarea
    });
  },
});

// File Upload Handler
$("#uploadBtn").click(function () {
  const fileInput = $("#fileInput")[0];
  const file = fileInput.files[0];

  if (!file) {
    toastr.error("Please select a file to upload.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  $.ajax({
    url: "fileUpload.php", // Replace with your server-side file upload script
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $("#uploadStatus").html("File uploaded successfully!");
      toastr.success("File uploaded successfully!");
    },
    error: function (xhr, status, error) {
      $("#uploadStatus").html("File upload failed. Please try again.");
      toastr.error("File upload failed: " + error);
    },
  });
});

// Example list of event venues
let eventVenues = [
  "Grand Ballroom",
  "Sunset Terrace",
  "Ocean View Hall",
  "Skyline Conference Room",
  "Rosewood Banquet",
  "Emerald Garden",
  "Luxury Pavilion",
  "Crystal Hall",
  "Golden Plaza",
  "Starlight Banquet",
  "Royal Orchid Hall",
  "Silver Moon Banquet",
  "Diamond Convention Center",
  "Blue Horizon Lounge",
  "Majestic Grand Hall",
  "Infinity Event Space",
  "Prestige Banquet Hall",
  "The Velvet Room",
  "Imperial Palace Hall",
  "Elysium Gardens",
  "Radiant Star Ballroom",
  "Pearl River Venue",
  "Regal Manor Banquet",
  "Opal Creek Hall",
  "Celestial Event Center",
  "The Sapphire Hall",
  "Moonlight Pavilion",
  "Amber Sunset Lounge",
  "The Heritage Hall",
  "The Ivory Tower Conference Room",
  "Summit View Banquet",
  "Lavender Garden Retreat",
  "The Golden Crest",
  "Aurora Banquet & Lounge",
  "The Zenith Ballroom",
  "Mirage Grand Hall",
  "The Platinum Atrium",
  "Harmony Banquet & Events",
  "The Eden Retreat Center",
  "Celeste Banquet & Convention",
  "The Grand Oasis",
  "Tranquil Waters Hall",
  "Serenity Banquet & Gardens",
  "The Twilight Terrace",
  "Vista Heights Event Center",
  "Opulence Banquet Hall",
  "The Enchanted Ballroom",
  "Euphoria Banquet & Events",
  "The Legacy Banquet Hall",
  "The Grand Heritage Hotel & Venue",
  "The Stellar Conference Center",
];

$("#eventVenue").autocomplete({
  source: eventVenues,
});
