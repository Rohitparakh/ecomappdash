import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& table ': {
      '& th:first-child, & td:first-child': {
        paddingLeft: `${0}!important`,
      },
      '& th:last-child, & td:last-child': {
        paddingRight: `${0}!important`,
      },
    },
  },
  divider: {
    width: 1,
    backgroundColor: theme.palette.divider,
    height: 144,
  },
  seller: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    marginRight: -88,
    paddingRight: 66,
    width: 480,
    '& .divider': {
      backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark),
      opacity: 0.5,
    },
  },
}));

const InvoiceTab = (props) => {
  const classes = useStyles(props);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  return (
    <div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0')}>
      {props.order && (
        <Card className="w-xl mx-auto shadow-0">
          <CardContent className="p-88 print:p-0">
            <Typography color="textSecondary" className="mb-32">
              {props.order.date}
            </Typography>

            <div className="flex justify-between">
              <div>
                <table className="mb-16">
                  <tbody>
                    <tr>
                      <td className="pb-4">
                        <Typography className="font-light" variant="h6" color="textSecondary">
                          INVOICE
                        </Typography>
                      </td>
                      <td className="pb-4 px-8">
                        <Typography className="font-light" variant="h6" color="inherit">
                          {props.order.reference}
                        </Typography>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <Typography color="textSecondary">
                  {`${props.order.customer.firstName} ${props.order.customer.lastName}`}
                </Typography>

                {props.order.customer.invoiceAddress.address && (
                  <Typography color="textSecondary">
                    {props.order.customer.invoiceAddress.address}
                  </Typography>
                )}
                {props.order.customer.phone && (
                  <Typography color="textSecondary">{props.order.customer.phone}</Typography>
                )}
                {props.order.customer.email && (
                  <Typography color="textSecondary">{props.order.customer.email}</Typography>
                )}
              </div>

              <div className={clsx(classes.seller, 'flex items-center p-16')}>
                <img className="w-80" src="assets/images/logos/fuse.svg" alt="logo" />

                <div className={clsx(classes.divider, 'divider mx-8 h-96')} />

                <div className="px-8">
                  <Typography color="inherit">ROHSTORE INC.</Typography>

                  <Typography color="inherit">19, Flowers Road, Kilpauk, Chennai 600010</Typography>
                  <Typography color="inherit">+91 984 098 9414</Typography>
                  <Typography color="inherit">rohitparakh4@gmail.com</Typography>
                  <Typography color="inherit">www.rohcodes.com</Typography>
                </div>
              </div>
            </div>

            <div className="mt-64">
              <Table className="simple">
                <TableHead>
                  <TableRow>
                    <TableCell>PRODUCT</TableCell>
                    <TableCell>PRICE</TableCell>
                    <TableCell align="right">QUANTITY</TableCell>
                    <TableCell align="right">TOTAL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.order.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Typography variant="subtitle1">{product.name}</Typography>
                      </TableCell>
                      <TableCell align="right">{formatter.format(product.price)}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        {formatter.format(product.price * product.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Table className="simple mt-32">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        SUBTOTAL
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        {formatter.format(props.order.subtotal)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        TAX
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        {formatter.format(props.order.tax)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        DISCOUNT
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="font-normal" variant="subtitle1" color="textSecondary">
                        {formatter.format(props.order.discount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography className="font-light" variant="h4" color="textSecondary">
                        TOTAL
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography className="font-light" variant="h4" color="textSecondary">
                        {formatter.format(props.order.total)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-96">
              <Typography className="mb-24 print:mb-12" variant="body1">
                Please pay within 15 days. Thank you for your business.
              </Typography>

              <div className="flex">
                <div className="flex-shrink-0">
                  <img className="w-48" src="assets/images/logos/fuse.svg" alt="logo" />
                </div>

                <Typography
                  className="font-normal mb-64 px-24"
                  variant="caption"
                  color="textSecondary"
                >
                  <ol type="1" style={{listStyle:"auto"}}>
                    <li>Products damaged during the transit will not be covered under the warranty.</li>
                    <li>The product carries a 90 days warranty unless otherwise stated.</li>
                    <li>The product carries only manufacturer’s warranty and no return or exchange will be entertained.</li>
                    </ol>
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(InvoiceTab);
