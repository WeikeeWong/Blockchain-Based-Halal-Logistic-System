pragma solidity ^0.4.17;
contract Input {

    struct defContainer{
        address ContainerAddr;
        string ContainerNo;
        string Description;
        string HalalStatus;
        string Supplier;
        uint Size;
    }

    struct defWarehouse{
        address WarehouseAddr;
        string WarehouseID;
        string WarehouseSize;
        string WarehouseAddress;
        string AreaCode;
        string HalalStatus;
    }

    struct Container{
        string _ContainerNo;
        string _HalalStatus;
        string _booked;
        string _StartDate;
        string _EndDate;
        string _ProductName;
        uint _Quantity;
        }

    struct Warehouse{
        string WarehouseID;
        string WarehouseSize;
        string AreaCode;
        string WarehouseAddress;
        string ProductName;
        string Quantity;
        string Status;
    }
    

    //0xAD6F6A2Abb8070C97f13C445ce08C9A59a64BAf6
    defContainer[] public defcontainer;
    defWarehouse[] public defwarehouse;
    Container[] public container;
    Warehouse[] public warehouse;

    address public issuingAuthority = 0xAD6F6A2Abb8070C97f13C445ce08C9A59a64BAf6;
    mapping(address => bool) registered;
    mapping(address => bool) public approvers;

    uint defcount=0;
    uint wadefcount=0;

    modifier issuingAuthorityOnly(){
        
        require(msg.sender == issuingAuthority);
        _;
        
    }

    function registerWarehouse (string WarehouseID, string WarehouseSize, string WarehouseAddress, string AreaCode, 
    string ProductName, string Quantity, string Status) public {
        
        Warehouse memory newWarehouse = Warehouse({
            WarehouseID: WarehouseID,
            WarehouseSize: WarehouseSize,
            WarehouseAddress: WarehouseAddress,
            AreaCode: AreaCode,
            ProductName: ProductName,
            Quantity: Quantity,
            Status: Status
        });
        
        warehouse.push(newWarehouse);
        
    }

   function registerContainer (string _ContainerNo, string _HalalStatus, string _booked, string _StartDate, string _EndDate, string _ProductName, uint _Quantity) public { 

        Container memory newContainer = Container({
            _ContainerNo: _ContainerNo,
            _HalalStatus: _HalalStatus,
            _booked: _booked,
            _StartDate: _StartDate,
            _EndDate: _EndDate,
            _ProductName: _ProductName,
            _Quantity: _Quantity

        });
        
        container.push(newContainer);
        
    }

    function defineContainer (string ContainerNo, string Description, string HalalStatus,string Supplier,uint Size) public{

        defContainer memory newDefine = defContainer({
            ContainerAddr: msg.sender,
            ContainerNo: ContainerNo,
            Description: Description,
            HalalStatus: HalalStatus,
            Supplier: Supplier,
            Size:Size
            
        });

        defcontainer.push(newDefine);
    
    }

    function defineWarehouse (string WarehouseID, string WarehouseSize, string WarehouseAddress, string AreaCode, string HalalStatus) public{

        defWarehouse memory newDefineWa = defWarehouse({
            WarehouseAddr: msg.sender,
            WarehouseID: WarehouseID,
            WarehouseAddress: WarehouseAddress,
            WarehouseSize: WarehouseSize,
            AreaCode: AreaCode,
            HalalStatus: HalalStatus
        });

        defwarehouse.push(newDefineWa);
    
    }
        

    function getdefContainerCount() public view returns (uint) {
        return defcontainer.length;
    }

    function getdefWarehouseCount() public view returns (uint) {
        return defwarehouse.length;
    }

    function getContainerCount() public view returns (uint){
        return container.length;
    }

    function getWarehouseCount() public view returns (uint) {
        return warehouse.length;
    }

}