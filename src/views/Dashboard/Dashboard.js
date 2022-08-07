import DashboardTable from './DashboardTable'
import {Container, TableContainer, ServiceSection} from './Dashboard.styles'
import RentService from './RentService'

const Dashboard = () => {
  return (
    <Container>
      <TableContainer>
        <DashboardTable />
      </TableContainer>

      <ServiceSection>
        <RentService />
      </ServiceSection>
    </Container>
  )
}

export default Dashboard
