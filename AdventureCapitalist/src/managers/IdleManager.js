class IdleManager {
    static instance = null;    
    
    /**
     * @returns {IdleManager}
     */
    static getInstance() {
        if (IdleManager.instance == null) {
            IdleManager.instance = new IdleManager();
        }

        return this.instance;
    }

    __catchUpBusiness(business, delta) {
        if (global.storage.getManagers().indexOf(business.name) >=0) {
            var deltaSeconds = Math.floor(delta / 1000);
            var revenue = Math.floor(deltaSeconds / business.time) * business.revenue;
            global.storage.setMoney(global.storage.getMoney() + revenue);
        }
        
        global.config.businesses.map((business) => {
            const financials = global.storage.getFinancials();
            business.cost = financials[business.name].cost;
            business.revenue = financials[business.name].revenue;
        });  
        
    }

    catchUp() {
        var lastSessionTs = global.storage.getTimestamp();
        var businesses = global.config.businesses;

        var delta = Date.now() - lastSessionTs;
        
        businesses.forEach((business) => {
            this.__catchUpBusiness(business, delta);
        })
        
    }

}
  
export default IdleManager;