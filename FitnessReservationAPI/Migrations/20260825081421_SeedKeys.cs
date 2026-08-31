using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace FitnessReservationAPI.Migrations
{
    /// <inheritdoc />
    public partial class SeedKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "KeyMasters",
                columns: new[] { "Id", "IsActive", "KeyNumber" },
                values: new object[,]
                {
                    { 1, true, "710" },
                    { 2, true, "711" },
                    { 3, true, "712" },
                    { 4, true, "713" },
                    { 5, true, "714" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "KeyMasters",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "KeyMasters",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "KeyMasters",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "KeyMasters",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "KeyMasters",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
