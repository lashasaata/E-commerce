// interface DashboardProps {
//   onLogout: () => void;
// }

// export function Dashboard({ onLogout }: DashboardProps) {
//   return (
//     <div className="min-h-screen bg-[#f9fafb]">
//       {/* Header */}
//       <header className="bg-[#ffffff] border-b border-[#e5e7eb]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <h1 className="text-xl sm:text-2xl font-semibold text-[#f97316]">ShopCart</h1>
//           </div>
//           <div className="flex items-center space-x-2 sm:space-x-4">
//             <button className="flex items-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#374151] bg-[#ffffff] border border-[#d1d5db] rounded-md hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-colors">
//               <svg className="h-4 w-4 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               <span className="hidden sm:inline">Profile</span>
//             </button>
//             <button
//               onClick={onLogout}
//               className="flex items-center px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium text-[#374151] bg-[#ffffff] border border-[#d1d5db] rounded-md hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-colors"
//             >
//               <svg className="h-4 w-4 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               <span className="hidden sm:inline">Logout</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-6 sm:mb-8">
//             <h2 className="text-2xl sm:text-3xl font-medium text-[#111827] mb-2">Welcome back!</h2>
//             <p className="text-sm sm:text-base text-[#6b7280]">
//               You've successfully logged into your ShopCart account.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//             {/* My Orders Card */}
//             <div className="bg-[#ffffff] rounded-lg shadow border border-[#e5e7eb] hover:shadow-md transition-shadow cursor-pointer">
//               <div className="p-4 sm:p-6">
//                 <div className="flex items-center mb-3 sm:mb-4">
//                   <svg className="h-5 w-5 mr-2 text-[#f97316] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <h3 className="text-base sm:text-lg font-medium text-[#111827]">My Orders</h3>
//                 </div>
//                 <p className="text-sm text-[#6b7280] mb-3 sm:mb-4">
//                   View and track your recent orders
//                 </p>
//                 <div className="space-y-1">
//                   <p className="text-xl sm:text-2xl font-semibold text-[#111827]">12</p>
//                   <p className="text-xs sm:text-sm text-[#6b7280]">Total orders</p>
//                 </div>
//               </div>
//             </div>

//             {/* Wishlist Card */}
//             <div className="bg-[#ffffff] rounded-lg shadow border border-[#e5e7eb] hover:shadow-md transition-shadow cursor-pointer">
//               <div className="p-4 sm:p-6">
//                 <div className="flex items-center mb-3 sm:mb-4">
//                   <svg className="h-5 w-5 mr-2 text-[#f97316] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                   <h3 className="text-base sm:text-lg font-medium text-[#111827]">Wishlist</h3>
//                 </div>
//                 <p className="text-sm text-[#6b7280] mb-3 sm:mb-4">
//                   Items you've saved for later
//                 </p>
//                 <div className="space-y-1">
//                   <p className="text-xl sm:text-2xl font-semibold text-[#111827]">5</p>
//                   <p className="text-xs sm:text-sm text-[#6b7280]">Saved items</p>
//                 </div>
//               </div>
//             </div>

//             {/* Account Settings Card */}
//             <div className="bg-[#ffffff] rounded-lg shadow border border-[#e5e7eb] hover:shadow-md transition-shadow cursor-pointer sm:col-span-2 xl:col-span-1">
//               <div className="p-4 sm:p-6">
//                 <div className="flex items-center mb-3 sm:mb-4">
//                   <svg className="h-5 w-5 mr-2 text-[#f97316] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   </svg>
//                   <h3 className="text-base sm:text-lg font-medium text-[#111827]">Account Settings</h3>
//                 </div>
//                 <p className="text-sm text-[#6b7280] mb-3 sm:mb-4">
//                   Manage your account preferences
//                 </p>
//                 <button className="w-full px-4 py-2 text-sm font-medium text-[#374151] bg-[#ffffff] border border-[#d1d5db] rounded-md hover:bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#f97316] focus:ring-offset-2 transition-colors">
//                   Manage Settings
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity Card */}
//           <div className="mt-6 sm:mt-8 bg-[#ffffff] rounded-lg shadow border border-[#e5e7eb]">
//             <div className="p-4 sm:p-6">
//               <div className="mb-4 sm:mb-6">
//                 <h3 className="text-base sm:text-lg font-medium text-[#111827] mb-1">Recent Activity</h3>
//                 <p className="text-sm text-[#6b7280]">
//                   Your latest shopping activities
//                 </p>
//               </div>
//               <div className="space-y-3 sm:space-y-4">
//                 <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-[#e5e7eb] rounded-lg">
//                   <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#f97316] flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-[#111827] truncate sm:truncate-none">Order #12345 has been shipped</p>
//                     <p className="text-xs sm:text-sm text-[#6b7280]">2 hours ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-[#e5e7eb] rounded-lg">
//                   <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#f97316] flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                   </svg>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-[#111827] truncate sm:truncate-none">Added "Wireless Headphones" to wishlist</p>
//                     <p className="text-xs sm:text-sm text-[#6b7280]">1 day ago</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-[#e5e7eb] rounded-lg">
//                   <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[#f97316] flex-shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                   </svg>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-[#111827] truncate sm:truncate-none">Order #12344 delivered successfully</p>
//                     <p className="text-xs sm:text-sm text-[#6b7280]">3 days ago</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
