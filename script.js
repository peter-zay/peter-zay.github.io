document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('projects-dropdown');

    if (dropdown) {
        dropdown.addEventListener('change', function() {
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            console.log('Selected Option:', selectedOption);

            if (selectedOption && selectedOption.value) {
                const projectUrl = selectedOption.value;
                console.log('Project URL:', projectUrl);
                window.location.href = projectUrl;
            } else {
                console.error('Selected option or value is missing.');
            }
        });
    } else {
        console.error('Dropdown element not found.');
    }
});

