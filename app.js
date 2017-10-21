(function () {
    angular.module('NarrowItDownApp', [])
        .directive('foundItems', foundItemsDirective)
        .component('itemsLoaderIndicator', {
            templateUrl: 'loader/itemsloaderindicator.template.html'
        })
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = [];
        ctrl.searchTerm = '';

        ctrl.getMatchedMenuItems = function () {
            ctrl.isLoading = true;
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm).then(function (result) {
                ctrl.found = result;
                ctrl.isLoading = false;
            })
        };

        ctrl.removeItem = function (index) {
            ctrl.found.splice(index, 1);
        };

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({url: 'https://davids-restaurant.herokuapp.com/menu_items.json'})
                .then(function (result) {
                    return result.data.menu_items.filter(function (item) {
                        return item.name.indexOf(searchTerm) !== -1;
                    });
                });
        };
    }

    function foundItemsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'itemslist.template.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsController,
            bindToController: true,
            controllerAs: 'ctrl'
        };
    }

    function FoundItemsController() {

    }
    

})();