// src/pages/home/dashboard.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";

const Dashboard: React.FC = () => {
    // Datos simulados
    const salesData = [
        { name: "Pendiente", value: 12 },
        { name: "En Proceso", value: 19 },
        { name: "Finalizada", value: 7 },
    ];

    const stockData = [
        { name: "Bajo", value: 3 },
        { name: "Medio", value: 8 },
        { name: "Alto", value: 15 },
    ];

    const revenueData = [
        { month: "Enero", revenue: 4000 },
        { month: "Febrero", revenue: 5000 },
        { month: "Marzo", revenue: 3500 },
        { month: "Abril", revenue: 6000 },
    ];

    const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Ventas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Estado de Ventas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={salesData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {salesData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Stock */}
                <Card>
                    <CardHeader>
                        <CardTitle>Niveles de Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={stockData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#82ca9d">
                                    {stockData.map((_entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Ingresos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ingresos Mensuales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={revenueData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8884d8"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
