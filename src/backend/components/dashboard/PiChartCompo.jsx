
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';


const COLORS = ['#FE619F', '#813ADA', '#03C5DA', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const PiChartCompo = ({charts=[]}) => {
    console.log(charts);
    const newDatas = charts?.map(item => {
        return {
            name : item?.name?.split('-')?.join(' '),
            value: item?.value,
        }
    })
    const data = newDatas;

    return (
        <>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart >
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default PiChartCompo;