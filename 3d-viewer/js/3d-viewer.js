'use strict';

// Wrap everything in an anonymous function to avoid polluting the global namespace
(function() {

    // Use the jQuery document ready signal to know when everything has been initialized
    $(document).ready(function() {
        // Tell Tableau we'd like to initialize our extension
        tableau.extensions.initializeAsync().then(function() {
            // Once the extension is initialized, ask the user to choose a sheet
            createButtons();

            // Remove all buttons and recreate them based on new sheet
            const worksheet = getSelectedSheet('Hotspot');
            worksheet.addEventListener(tableau.TableauEventType.FilterChanged, function(){
                document.getElementById("model-viewer").innerHTML = "";
                createButtons();
            });

        });
    });

     // This function creates a button for each row in the sheet
    function createButtons() {

        // The first step in choosing a sheet will be asking Tableau what sheets are available
        const worksheet = getSelectedSheet('Hotspot');

        // Call to get the selected marks for our sheet
        worksheet.getSummaryDataAsync().then(function(sumdata) {
        // Get the first DataTable for our selected marks (usually there is just one)
        const worksheetData = sumdata.data;

            // For each row in this table we wil now use the columns to populate the buttons
            worksheetData.forEach(function(row) {

                // Declare our new button which contains the data for the selected row
                // The columns in the sheet hotspot must be in the order below
                // Can be improved by using the getSummaryColumnsInfoAsync function to get the index
                // Column 0 is the Work Area
                // Column 1 is the Data Position
                // Column 2 is the Data Noraml
                // Column 3 is the Tooltip Text
                // Column 4 is the KPI Number
                // Column 5 is the KPI Color
                const button = $("<button class='workarea' kpi='"+row[5].value
                                +"' slot='hotspot-"+row[0].value
                                +"' name='"+row[0].value
                                +"' data-position='"+row[1].value
                                +"' data-normal='"+row[2].value
                                +"' data-visibility-attribute='invisible'>"+row[4].value
                                +"<div class='tooltiptext'>"+row[3].value
                                +"</div></button>");
    
                // Add our button to the model-viewer 
                button.click(filterWorkarea);
                $('#model-viewer').append(button);

            });


        });

    }

    // This is the clear button that will be created after selecting a hotspot
    const clearButton = $("<button class='reset' id='clearbutton'>Clear Selected Work Area</button>");

    // This function resets the filter set by filterWorkarea
    function filterWorkarea(event) {
        const worksheet = getSelectedSheet('Work Orders');
        // The work area related to the hotspot will be set
        worksheet.applyFilterAsync('Work Area',[event.target.name],'replace');
        // Add our button to the model-viewer 
        clearButton.click(clearWorkarea);
        $('#model-viewer').append(clearButton);
       

    }

    // This function resets the filter set by filterWorkarea
    function clearWorkarea(event)
    {
        const worksheet = getSelectedSheet('Work Orders');
        //All work areas will be selected
        worksheet.applyFilterAsync('Work Area',[""],'all');
        //After clearing the filters the button will be removed
        $('#clearbutton').remove();

        
    }
    
    // This function gets the worksheet
    function getSelectedSheet(worksheetName) {

        return tableau.extensions.dashboardContent.dashboard.worksheets.find(function(sheet) {
            return sheet.name === worksheetName;
        });
    }

})();