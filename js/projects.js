let currentIndex = 0;
let projects = [];

// Fetch and display the projects
async function fetchProjects() {
    try {
        const response = await fetch("js/db.json"); // Make sure this path is correct
        projects = await response.json(); // Parse the JSON file
        displayProjects(projects); // Call the function to display the data
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

// Function to generate project display in the slider
function displayProjects(projects) {
    const sliderWrapper = document.getElementById("slider-wrapper");

    // Create all the project slides
    projects.forEach((project, index) => {
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        const projectContent = document.createElement("div");
        projectContent.classList.add("container");

        const projectImage = document.createElement("img");
        projectImage.src = project.image;
        projectImage.alt = project.title;
        projectImage.classList.add("banner-image");

        const projectTitle = document.createElement("h1");
        projectTitle.textContent = project.title;

        const projectDescription = document.createElement("p");
        projectDescription.innerHTML = `${project.description} <br/>`;

        const buttonWrapper = document.createElement("div");
        buttonWrapper.classList.add("button-wrapper");

        const codeButton = document.createElement("button");
        codeButton.classList.add("btn", "fill");
        const codeLink = document.createElement("a");
        codeLink.href = project.codeLink;
        codeLink.textContent = "Code";
        codeButton.appendChild(codeLink);

        const liveButton = document.createElement("button");
        liveButton.classList.add("btn", "outline");
        const liveLink = document.createElement("a");
        liveLink.href = project.liveLink;
        liveLink.textContent = "Live";
        liveButton.appendChild(liveLink);

        buttonWrapper.appendChild(codeButton);
        buttonWrapper.appendChild(liveButton);

        const contentWrapper = document.createElement("div");
        contentWrapper.classList.add("content-wrapper");

        contentWrapper.appendChild(projectTitle);
        contentWrapper.appendChild(projectDescription);
        contentWrapper.appendChild(buttonWrapper);

        projectContent.appendChild(projectImage);
        projectContent.appendChild(contentWrapper);

        projectContainer.appendChild(projectContent);
        sliderWrapper.appendChild(projectContainer);
    });
}

// Function to change slide
function changeSlide(direction) {
    const totalSlides = projects.length;
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    const sliderWrapper = document.getElementById("slider-wrapper");
    const offset = -currentIndex * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;
}

// Call the function to fetch and display the projects
fetchProjects();
