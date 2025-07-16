import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function MegaMenu() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
            className="relative"
        >
            <button className="flex items-center gap-1 font-semibold text-black">
                Features <ChevronDown size={16} />
            </button>

            {showMenu && (
                <div
                    className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 
               w-[95vw] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px]
               bg-white shadow-xl rounded-xl p-6 
               grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-50">

                    {/* Column 1 */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Core Features</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><strong>WhatsApp Business API</strong> – Access the official API. 0% markup!</li>
                            <li><strong>WhatsApp Blue Tick</strong> – Get trusted verification badge</li>
                        </ul>
                    </div>

                    {/* Column 2 */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Capture</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><strong>Click-to-WhatsApp Ads</strong> – Turn ad clicks into conversations</li>
                            <li><strong>WhatsApp CRM</strong> – Organize and segment contacts</li>
                            <li><strong>Capture Leads</strong> – Collect leads from CRMs, ERPs, etc.</li>
                            <li><strong>WhatsApp Flows</strong> – Collect data through in-chat forms</li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Engage & Nurture</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><strong>Transactional Messages</strong> – Send alerts & updates</li>
                            <li><strong>WhatsApp Automation</strong> – 24×7 engagement</li>
                            <li><strong>WhatsApp Chatbot</strong> – Scale conversations</li>
                            <li><strong>WhatsApp Drip Sequences</strong> – Automate nurturing</li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-3">Convert</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                            <li><strong>Bulk Broadcast</strong> – Send WhatsApp messages</li>
                            <li><strong>Team Inbox</strong> – Collaborate on chats</li>
                            <li><strong>Catalogs</strong> – Sell directly</li>
                            <li><strong>Advanced Analytics</strong> – Track clicks & delivery</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
