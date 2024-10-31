async function fetchNFTs() {
    const address = 'tz1b43aDDXCU4xyh6ABcVERKr1KGWqxsgD8G';
    const nftContainer = document.getElementById('nft-container');
    nftContainer.innerHTML = '';

    // Affiche l'adresse du propriétaire
    const ownerAddressElement = document.createElement('div');
    ownerAddressElement.className = 'owner-address';
    ownerAddressElement.innerText = `Owner: ${address}`;
    nftContainer.appendChild(ownerAddressElement);

    try {
        const response = await fetch(`https://api.tzkt.io/v1/tokens/balances?account=${address}&token.standard=fa2&limit=1000`);
        const data = await response.json();

        if (!data || data.length === 0) {
            nftContainer.innerHTML += '<p>No NFTs found for this address.</p>';
            return;
        }

        const nfts = data.filter(item => item.token && item.token.metadata);

        if (nfts.length === 0) {
            nftContainer.innerHTML += '<p>No NFTs found for this address.</p>';
            return;
        }

        nfts.forEach(nft => {
            const nftElement = document.createElement('div');
            nftElement.className = 'nft';

            const thumbnailUri = nft.token.metadata.displayUri || '';
            nftElement.innerHTML = `
                <h2>${nft.token.metadata.name}</h2>
                <a href="https://tzkt.io/${nft.token.contract.address}/tokens/${nft.token.tokenId}" target="_blank">
                    <img src="loading.jpg" alt="${nft.token.metadata.name}" />
                </a>
            `;

            // Charger l'image via IPFS
            const imageElement = nftElement.querySelector('img');
            loadImage(thumbnailUri, imageElement);

            nftContainer.appendChild(nftElement);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des NFTs:', error);
        nftContainer.innerHTML += '<p>Erreur lors de la récupération des NFTs. Veuillez réessayer.</p>';
    }
}

// Fonction pour charger une image depuis les passerelles IPFS
function loadImage(displayUri, imageElement) {
    const gateways = [
        'https://dweb.link/ipfs/',
        'https://cloudflare-ipfs.com/ipfs/'
    ];
    let uriIndex = 0;

    const tryLoadImage = () => {
        if (uriIndex >= gateways.length) {
            imageElement.src = 'path_to_fallback_image.jpg'; 
            return;
        }

        imageElement.src = displayUri.replace('ipfs://', gateways[uriIndex]);
        imageElement.onerror = () => {
            uriIndex++;
            tryLoadImage();
        };
    };

    tryLoadImage();
}

window.onload = fetchNFTs;