const Homepage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Homepage</h1>
      <div className="flex flex-col gap-y-8">
        <div>
          <h2 className="text-2xl text-gray-700 mb-2 ">What is the purpose of this project?</h2>
          <ol className="list-decimal list-inside text-gray-700 leading-7">
            <li>Gain some basic knowledge about backend development in Nest.js</li>
            <li>Learn how to implement secure authentication</li>
            <li>
              Learn how to create my own components such as selects and dropdowns without help of any existing component
              library
            </li>
            <li>Land the foundation for the project that could be usefull for myself</li>
          </ol>
        </div>
        <div>
          <h2 className="text-2xl text-gray-700 mb-2">What has been done so far?</h2>
          <ul className="flex flex-col gap-y-6 text-lg text-gray-700">
            <li>
              User
              <ul className="list-disc list-inside text-base leading-7">
                <li>Secure authentication process</li>
              </ul>
            </li>
            <li>
              Transaction
              <ul className="list-disc list-inside text-base leading-7">
                <li>Displays a list of all user transactions</li>
                <li>Allows user to add new transaction</li>
                <li>User can create custom transaction cateogires.</li>
                <li>Enables user to edit or delete existing transactions</li>
              </ul>
            </li>
            <li>
              Dashboard
              <ul className="list-disc list-inside text-base leading-7">
                <li>Graph showing balance trends over time</li>
                <li>Pie chart visualizing transaction distribution by category.</li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl text-gray-700 mb-2">What needs to be added/improved for sure?</h2>
          <ul className="flex flex-col gap-y-6 text-lg text-gray-700">
            <li>
              Overall
              <ul className="list-disc list-inside text-base leading-7">
                <li>Improve documentation</li>
                <li>Add shadow loading</li>
                <li>Add test for crucial functionality (try Jest for fun)</li>
              </ul>
            </li>
            <li>
              User
              <ul className="list-disc list-inside text-base leading-7">
                <li>Implement a password reset feature</li>
                <li>Add a user settings page</li>
              </ul>
            </li>
            <li>
              Transactions
              <ul className="list-disc list-inside text-base leading-7">
                <li>Add filters for viewing data by specific timeframe</li>
                <li>Improve category management (create it's own page probably)</li>
              </ul>
            </li>
            <li>
              Dashboard
              <ul className="list-disc list-inside text-base leading-7">
                <li>Add posibility to filter by timeframes</li>
                <li>Improve pie chart legend</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
