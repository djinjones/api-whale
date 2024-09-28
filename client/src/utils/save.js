// file is for handling logic of saving user's data to the local storage

class SaveService {
    checkSave() {
        let saveData = localStorage.getItem('save-data-api-whale');

        if(!saveData) {
            console.log("no save data in local storage!");
            localStorage.setItem('save-data-api-whale', []);
            saveData = []

        }
        return saveData;
    }

    saveCurrent(currentPage) {
        let saveData = localStorage.getItem('save-data-api-whale');

        saveData.push(currentPage)
        localStorage.setItem(saveData);
    }

    checkFirstTime() {
        let hasLoggedIn = localStorage.getItem('has-logged-in-api-whale');
        if(!hasLoggedIn) {
            localStorage.setItem('has-logged-in-api-whale', 1)
            return false
        } else {
            hasLoggedIn++
            localStorage.setItem('has-logged-in-api-whale', hasLoggedIn)
            return true
        }
    }


}

export default new SaveService();
