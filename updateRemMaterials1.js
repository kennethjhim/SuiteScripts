/**
 * Developer: Kenneth Infante
 * Email: kenneth@suitetoday.com
 * Type: Schedule script
 * SuiteScript Version: 1.0
 * Description:
 * 		This script uses customsearch977 to get the remaining materials costs of each project
 * 		We update the job/project custentityremaining_materials if the it doesn't match what's shown in the search.
 *
 */

function updateRemainingMaterials() {

	var searchResults = getResultsFromSavedSearch('transaction', 'customsearch_remaining_materials_costs');
	var success = updateRecordsInSavedSearch('job', 'custentityremaining_materials', searchResults, 0, 2, 3);
	if(success) {
		nlapiLogExecution('error','Success', 'Updated' + success.length + ' records');
	}

	var list = updateRecordsNotInSavedSearch('job', 'custentityremaining_materials', success, 0);

	if(list) {
		nlapiLogExecution('error','Success', 'Updated' + list.length + ' records');
	}
}


/**
 * Update records in a saved search.
 *
 * @params {string} recordType the record type containing the field to be updated
 * @params {string} fieldId the field id of the field to be updated
 * @params {object} the instance of nlobjSearchResult containing the saved search results
 * @params {integer} recordIdColumn the column index for the internal id of the record containing the field to be updated
 * @params {integer} oldValueColumn the column index for the value to be updated
 * @params {integer} newValueColumn the column index for the new value
 * @return {array} returns the processed internal ids
 */
function updateRecordsInSavedSearch(recordType, fieldId, searchResults, recordIdColumn, newValueColumn, oldValueColumn) {

	try {
		var context = nlapiGetContext();
		var processedIds = [];
		if (searchResults) {
			for(var i = 0, y = searchResults.length; i < y; i++) {
				// get the values of columns needed in each row
				var columns = searchResults[i].getAllColumns(),
					recordId = searchResults[i].getValue(columns[recordIdColumn]),
					oldValue = searchResults[i].getValue(columns[oldValueColumn]),
					newValue = searchResults[i].getValue(columns[newValueColumn]);

				// get remaining usage
				if (context.getRemainingUsage() <= 5 && (i+1) < y) {
				   var status = nlapiScheduleScript(context.getScriptId(), context.getDeploymentId())
				   if ( status == 'QUEUED' )
				      break;
				}

				// if the new value is not equal to the current value is not equal, update the field with the new value
					nlapiSubmitField(recordType, recordId, fieldId, newValue);

				// add to the list of processed ids the latest processed id
				processedIds.push(recordId);
			}
		} else {
			nlapiLogExecution('debug', 'No records to update');
		}

		nlapiLogExecution('debug', 'Finished Updating Saved Search');
		return processedIds;

	} catch(e) {
		nlapiLogExecution('error','suiteScript() has encountered an error in updating the saved search.',errText(e, recordId));
		return false;
	}

}

/**
 * Perform a record search using an existing search or filters and columns.
 *
 * @param  {string} type the type of saved search
 * @param  {string} id   the internal id of the saved search
 */
function getResultsFromSavedSearch(type, id) {
	return nlapiSearchRecord(type, id);
}

/**
 * Provides detailed error message.
 *
 * @params {error} e the error instance
 * @params {integer} internalId the internal id of the record when the error occurred
 * @return {string}
 */

function errText(e, internalId)
{
    if(!(typeof internalId==='number' && (internalId%1)===0)) {
        internalId = 0;
    }

    var txt='';
    if (e instanceof nlobjError) {
        //this is netsuite specific error
        txt = 'NLAPI Error: Record ID :: '+internalId+' :: '+e.getCode()+' :: '+e.getDetails() + ' :: ' + e.getStackTrace().join(', ');
    } else {
        //this is generic javascript error
        txt = 'JavaScript/Other Error: Record ID :: '+internalId+' :: '+e.toString()+' : '+e.stack;
    }
    return txt;
}

/**
 * Convert a string into a number
 *
 * @param  {string} value the string to be converted
 */
function toNumber(value) {
	return (parseFloat(value) == NaN)?0.0:parseFloat(value);
}

/**
 * Convert a string into a Date object
 *
 * @param  {string} value the string to be converted
 */
function toDate(value) {
	return nlapiStringToDate(value);
}

/**
 * Checks if filter is empty or null
 *
 * @param  {mixed} value the filter value to check
 * @return {mixed}
 */
function emptyFilterCheck(value) {
	if(value) {
		return value;
	} else {
		return '@NONE@';
	}
}


3133,
3134,
3135,
3136,
3137,
3138,
3139,
3140,
3141,
3142,
3143,
3144,
3145,
3146,
3147,
3148,
3149,
3150,
3151,
3152,
3153,
3154,
3155,
3156,
3157,
3158,
3159,
3160,
3161,
3162,
3163,
3164,
3165,
3166,
3167,
3168,
3169,
3170,
3171,
3172,
3173,
3174,
3175,
3176,
3177,
3178,
3179,
3180,
3181,
3182,
3183,
3184,
3185,
3186,
3187,
3188,
3189,
3190,
3191,
3192,
3193,
3194,
3195,
3196,
3197,
3198,
3199,
3200,
3201,
3202,
3203,
3204,
3205,
3206,
3207,
3208,
3209,
3210,
3211,
3212,
3213,
3214,
3215,
3216,
3217,
3218,
3219,
3220,
3221,
3222,
3223,
3224,
3225,
3226,
3227,
3228,
3229,
3230,
3231,
3232,
3233,
3234,
3235,
3236,
3237,
3238,
3239,
3240,
3241,
3242,
3243,
3244,
3245,
3246,
3247,
3248,
3249,
3250,
3251,
3252,
3253,
3254,
3255,
3256,
3257,
3258,
3259,
3260,
3261,
3262,
3263,
3264,
3265,
3266,
3267,
3268,
3269,
3270,
3271,
3272,
3273,
3274,
3275,
3276,
3277,
3278,
3279,
3280,
3281,
3282,
3283,
3284,
3285,
3286,
3287,
3288,
3289,
3290,
3291,
3292,
3293,
3294,
3295,
3296,
3297,
3298,
3299,
3300,
3301,
3302,
3303,
3304,
3305,
3306,
3307,
3308,
3309,
3310,
3311,
3312,
3313,
3314,
3315,
3316,
3317,
3318,
3319,
3320,
3321,
3322,
3323,
3324,
3325,
3326,
3327,
3330,
3329,
3330,
3331,
3332,
3333,
3334,
3335,
3336,
3337,
3338,
3339,
3340,
3341,
3342,
3343,
3344,
3345,
3346,
3347,
3348,
3349,
3350,
3351,
3352,
3353,
3354,
3355,
3356,
3357,
3358,
3359,
3360,
3361,
3362,
3363,
3364,
3365,
3366,
3367,
3368,
3369,
3370,
3371,
3372,
3373,
3374,
3375,
3376,
3377,
3378,
3379,
3380,
3381,
3382,
3383,
3384,
3385,
3386,
3387,
3388,
3389,
3390,
3391,
3392,
3393,
3394,
3395,
3396,
3397,
3398,
3399,
3400,
3401,
3402,
3403,
3404,
3405,
3406,
3407,
3408,
3409,
3410,
3411,
3412,
3413,
3414,
3415,
3416,
3417,
3418,
3419,
3420,
3421,
3422,
3423,
3424,
3425,
3426,
3427,
3428,
3429,
3430,
3431,
3432,
3433,
3434,
3435,
3436,
3437,
3438,
3439,
3440,
3441,
3442,
3443,
3444,
3445,
3446,
3447,
3448,
3449,
3450,
3451,
3452,
3453,
3454,
3455,
3456,
3457,
3458,
3459,
3460,
3461,
3462,
3463,
3464,
3465,
3466,
3467,
3468,
3469,
3470,
3471,
3472,
3473,
3474,
3475,
3476,
3477,
3478,
3479,
3480,
3481,
3482,
3483,
3484,
3485,
3486,
3487,
3488,
3489,
3490,
3491,
3492,
3493,
3494,
3495,
3496,
3497,
3498,
3499,
3500,
3501,
3502,
3503,
3504,
3505,
3506,
3507,
3508,
3509,
3510,
3511,
3512,
3513,
3514,
3515,
3516,
3517,
3518,
3519,
3520,
3521,
3522,
3523,
3524,
3525,
3526,
3527,
3528,
3529,
3530,
3531,
3532,
3533,
3534,
3535,
3536,
3537,
3538,
3539,
3540,
3541,
3542,
3543,
3544,
3545,
3546,
3547,
3548,
3549,
3550,
3551,
3552,
3553,
3554,
3555,
3556,
3557,
3558,
3559,
3560,
3561,
3562,
3563,
3564,
3565,
3566,
3567,
3568,
3569,
3570,
3571,
3572,
3573,
3574,
3575,
3576,
3577,
3578,
3579,
3580,
3581,
3582,
3583,
3584,
3585,
3586,
3587,
3588,
3589,
3590,
3591,
3592,
3593,
3594,
3595,
3596,
3597,
3598,
3599,
3600,
3601,
3602,
3603,
3604,
3605,
3606,
3607,
3608,
3609,
3610,
3611,
3612,
3613