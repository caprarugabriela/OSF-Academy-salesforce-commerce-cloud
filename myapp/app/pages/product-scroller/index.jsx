import React, {useEffect, useState} from 'react'
import ProductScrollerPWA from './../../components/product-scroller/index.jsx'
import {Container, Box, Button, Input, Stack} from '@chakra-ui/react'
import {helpers, ShopperLogin, ShopperProducts} from 'commerce-sdk-isomorphic'

// defining variables
// product ID  - source for them is mock-data.js
// examples of IDs: '25588993M' , '883360544083M', '701642867135M'
const ProductScrollerWrapper = () => {
    const [productID, setProductID] = useState('')
    const [productList, setProductList] = useState([])
    const [productListString, setProductListString] = useState('')

    // managing products
    const [shopperProductsClient, setShopperProductsClient] = useState(null)
    const [shopperProducts, setShopperProducts] = useState(null)
    const [editedProducts, setEditedProducts] = useState(null)

    const handleChangeProductID = (event) => {
        setProductID(event.target.value)
    }

    // define possibility to add a new product to the list
    // if product ID is not empty and not already in the list
    // add product ID to the list
    // add product ID to the list string
    // clear input field
    const addProduct = () => {
        if (productID !== '' && !productList.includes(productID)) {
            const newArr = [...productList]
            newArr.push(productID)
            setProductList(newArr)
            setProductListString(productListString.split(',') + ',' + productID.toString())
            setProductID('')
        } else {
            // add a console error message
            console.log('Oops, invalid product ID! Please check the ID and try again!')
        }
    }

    //remove product from list and list string
    //remove product from list string
    //remove product from list
    //clear input field
    const removeProduct = (removedProduct) => {
        const newArr = [...productList]
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i] == removedProduct) {
                newArr.splice(i, 1)
                setProductList(newArr)
                console.log(removedProduct.concat(',').split(',').reverse().join(''))
                setProductListString(productListString.replace(removedProduct, ''))
            }
        }
    }

    // Creating a configuration to use when creating API clients
    // https://www.youtube.com/watch?v=2xx_c7qCmiM&t=157s - as per this video
    const config = {
        proxy: 'http://localhost:3000/mobify/proxy/api', // Routes API calls through a proxy when set
        headers: {},
        parameters: {
            clientId: '1d763261-6522-4913-9d52-5d947d3b94c4',
            organizationId: 'f_ecom_zzte_053',
            shortCode: 'kv7kzm78',
            siteId: 'RefArch'
        },
        throwOnBadResponse: true
    }

    const shopperLogin = new ShopperLogin(config)

    //getting an access token for guests
    const getGuestAccessToken = async () => {
        // Execute Public Client OAuth with PKCE ((Proof Key for Code Exchange) to acquire guest tokens
        const {access_token, refresh_token} = await helpers.loginGuestUser(shopperLogin, {
            redirectURI: `http://localhost:3000/callback`
        })
        return access_token
    }

    //creating shopper client with using the access token
    const createShopperProductsClient = async () => {
        // obtain the access token
        await getGuestAccessToken().then((access_token) => {
            // create a new shopper client with the access token
            const newShopperProductsClient = new ShopperProducts({
                ...config,
                headers: {authorization: `Bearer ${access_token}`}
            })
            setShopperProductsClient(newShopperProductsClient)
            return newShopperProductsClient
        })
    }

    //creating function to get the shopper products based on the provided IDs
    const getShopperProducts = async (productListString) => {
        await createShopperProductsClient().then(async () => {
            const products = await shopperProductsClient.getProducts({
                parameters: {
                    ids: productListString
                }
            })
            setShopperProducts(products)
            return products
        })
    }

    //editing products with the desired format for the ProductScrollerPWA
    // preparing the products
    const editProductsObjectForScroller = () => {
        let editedProductsForScroller = []

        if (shopperProducts?.data) {
            shopperProducts.data.map((product) => {
                // console.log("zzzzz", product);
                editedProductsForScroller.push({
                    currency: product.currency,
                    name: product.name,
                    price: product.price,
                    productId: product.id,
                    image: product.imageGroups[0].images[0]
                })
            })
        }
        setEditedProducts(editedProductsForScroller)
    }

    //viewing the product scroller after "Get Products button" is pressed
    const [isScrollerOpen, setIsScrollerOpen] = useState(false)

    const showProductScroller = () => {
        if (shopperProducts) {
            setIsScrollerOpen(true)
        }
    }

    //updating the edited shopper products every time shopper products changes
    useEffect(() => {
        editProductsObjectForScroller()
    }, [shopperProducts])

    //update shopper products every time productListString changes
    useEffect(() => {
        getShopperProducts(productListString)
        // console.log("productListString =>>>>", productListString)
    }, [productListString])

    return (
        <>
            <Container>
                <Box>
                    <Box mt={3}>
                        <Input
                            placeholder="Please insert the product ID"
                            mb={2}
                            value={productID}
                            onChange={handleChangeProductID}
                        />

                        {productList?.map((product, i) => {
                            return (
                                <Box key={i} display="flex" justifyContent="end" mb={2}>
                                    <Box
                                        width="100%"
                                        border="1px"
                                        borderColor="gray.100"
                                        borderRadius={5}
                                        mr={3}
                                        display="flex"
                                        alignItems="center"
                                        paddingInline={3}
                                    >
                                        {product}
                                    </Box>
                                    <Button
                                        onClick={() => {
                                            removeProduct(product)
                                        }}
                                        mb={2}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            )
                        })}
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Button onClick={addProduct} mb={2}>
                            Add Field
                        </Button>
                        <Button onClick={showProductScroller}>Get Products</Button>
                    </Box>
                </Box>

                <Box mb={3}>
                    Product Scroller
                    {editedProducts && isScrollerOpen && (
                        <>
                            <Stack pt={8} spacing={16}>
                                <ProductScrollerPWA products={editedProducts} />
                            </Stack>
                        </>
                    )}
                </Box>
            </Container>
        </>
    )
}
export default ProductScrollerWrapper
