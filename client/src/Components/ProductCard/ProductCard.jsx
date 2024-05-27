import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ProductCard = ({ product }) => {
    return (
        <Card sx={{ maxWidth: 345, marginBottom: 5 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={product.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography variant="body3" color="text.secondary">
                    ${product.price}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">View Product</Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard