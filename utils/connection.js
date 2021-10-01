

const connAttrs = {
    "user": "SNL_PROCESS_SA",
    "password": "SNL_PROCESS_SA",
    "connectString": "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=orcl)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))"
}

module.exports = {
    connAttrs
}

