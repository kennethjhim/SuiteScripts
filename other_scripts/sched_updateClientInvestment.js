function updateClientInvestment() {
	var searchResults = getResultsFromSavedSearch('customer', 'customsearch_client_total_investment');
	var success = updateRecordsInSavedSearch('customer', 'custentity_investment', searchResults, 0, 4, 3);

	if(success) {
		nlapiLogExecution('debug','Success', 'Updated' + success.length + ' records');
	}


}


