// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/interfaces/IERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact dehartdean@gmail.com
contract ThoughtsAndPrayers is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint16 totalSupply;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;

    constructor() ERC721("ThoughtsAndPrayers", "TAP") {
        totalSupply = 9999;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint16 tokenId = uint16(_tokenIdCounter.current());
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function payToMint(address recipient, string memory metaDataURI)
        public
        payable
        returns (uint256)
    {
        require(this.count() < totalSupply);
        require(
            existingURIs[metaDataURI] != 1,
            "This NFT Has Already Been Minted!"
        );
        require(msg.value >= 0.05 ether, "You Must Pay At Least 0.05 Ether!");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metaDataURI] = 1;
        _mint(recipient, newItemId);

        _setTokenURI(newItemId, metaDataURI);

        return newItemId;
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function count() public view returns (uint16) {
        return uint16(_tokenIdCounter.current());
    }
}
