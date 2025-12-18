import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function DoctorDashboardTest() {
    try {
        const session = await getServerSession(authOptions)

        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Doctor Dashboard Test</h1>
                <pre className="bg-gray-100 p-4 rounded">
                    {JSON.stringify(session, null, 2)}
                </pre>
            </div>
        )
    } catch (error) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error in Dashboard</h1>
                <pre className="bg-red-100 p-4 rounded text-sm">
                    {error.toString()}
                    {"\n\n"}
                    {error.stack}
                </pre>
            </div>
        )
    }
}
