import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import ProductCard from '../../../components/ProductCard';

const RelatedProducts = props => {
    const { relatedProducts } = props;

    return (
        <>
            <Grid
                col={5}
                mdCol={2}
                smCol={1}
                gap={20}
            >
                {
                    relatedProducts?.map((item, index) => (
                        <ProductCard
                            categorySlug={item.categorySlug}
                            key={index}
                            title={item.title}
                            colors={item.colors}
                            price={Number(item.price)}
                            slug={item.slug}
                            sale={Number(item.sale)}
                        />
                    ))
                }
            </Grid>
        </>
    )
}

RelatedProducts.propTypes = {
    relatedProducts: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default RelatedProducts