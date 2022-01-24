// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

/// @custom:security-contact dehartdean@gmail.com
contract ThoughtsAndPrayers is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    uint14 totalSupply;

    Counters.Counter private _tokenIdCounter;

    mapping(string => uint8) existingURIs;

    constructor() ERC721("ThoughtsAndPrayers", "TAP") {
        totalSupply = 9999;
        _tokenIdCounter = new Counters.Counter(0);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
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
        require(this.count() < this.totalSupply());
        require(
            existingURIs[metadataURI] != 1,
            "This NFT Has Already Been Minted!"
        );
        require(msg.value >= 0.05 ether, "You Must Pay At Least 0.05 Ether!");

        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[metadataURI] = 1;
        _mint(recipient, newItemId);

        _setTokenURI(newItemId, metadataURI);

        return newItemId;
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function count() public view returns (uint14) {
        return _tokenIdCounter.current();
    }
}
