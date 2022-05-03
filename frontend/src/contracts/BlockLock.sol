pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/Strings.sol";

contract BlockLock {
    struct User {
        bytes32 id;
        bool isauth;
        string name;
        bytes32[] documents;
    }
    struct Document {
        bytes32 id;
        bytes32 owner;
        bool isauth;
        string name;
        bytes32[] viewers;
    }
    uint256 public document_count = 0;
    uint256 public user_count = 0;
    mapping(bytes32 => User) public users;
    mapping(bytes32 => Document) public documents;

    function stringToBytes32(string memory source)
        internal
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

    event getId(bytes32 id);
    event error(string s);

    function newUser(string memory name) external {
        user_count++;
        bytes32 uid = stringToBytes32(
            string(abi.encodePacked("user_", Strings.toString(user_count)))
        );
        User memory newu = User({
            id: uid,
            name: name,
            isauth: true,
            documents: new bytes32[](0)
        });
        users[uid] = newu;
        emit getId(uid);
    }

    function newDocument(bytes32 mid, string memory name) external {
        if (users[mid].isauth == false) {
            emit error("only users can add document");
            return;
        }
        document_count++;
        bytes32 uid = stringToBytes32(
            string(
                abi.encodePacked("document_", Strings.toString(document_count))
            )
        );
        Document memory newd = Document({
            id: uid,
            isauth: true,
            owner: mid,
            name: name,
            viewers: new bytes32[](0)
        });
        documents[uid] = newd;
        users[mid].documents.push(uid);
        emit getId(uid);
    }

    function giveAccess(
        bytes32 did,
        bytes32 owid,
        bytes32 shareid
    ) external {
        if (users[owid].isauth == false) {
            emit error("only users can add document");
            return;
        }
        if (users[shareid].isauth == false) {
            emit error("invalid user");
            return;
        }
        if (documents[did].isauth == false) {
            emit error("Invalid document id");
            return;
        }
        if (documents[did].owner != owid) {
            emit error(
                "The given user does not have authorization to share this document"
            );
            return;
        }
        documents[did].viewers.push(shareid);
    }

    function getAccessRecord(bytes32 did)
        public
        view
        returns (bytes32[] memory)
    {
        return documents[did].viewers;
    }
}
